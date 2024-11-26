import { type Locator, type Page, expect } from "@playwright/test";

export class BusionessLeadPom {
  public readonly _interval: number = 700;
  //Customer
  public readonly _customerLoockupField: Locator;
  public readonly _projectNameField: Locator;
  //Address
  public readonly _projectAddressField: Locator;
  public readonly _attachmmentField: Locator;
  //Contact
  public readonly _contactCustomerLabel: Locator;
  public readonly _influencerCustomerLabel: Locator;
  public readonly _contactLookupField: Locator;
  public readonly _influencerLookupField: Locator;
  public readonly _roleOptions: Locator;
  public readonly _phoneField: Locator;
  public readonly _emailField: Locator;
  //General
  public readonly _siteOptions: Locator;
  public readonly _serviceLineOptions: Locator;
  public readonly _oportunityTipeOptions: Locator;
  public readonly _aditionalServiceLineAnswer: Locator;
  public readonly _aditionalServiceLinesOptions: Locator;
  public readonly _sourceFundigOption: Locator;
  public readonly _typeOfDamageOption: Locator;
  public readonly _causeOfDamageOption: Locator;
  public readonly _contractField: Locator;
  public readonly _leadDescriptionField: Locator;
  public readonly _sourceOption: Locator;
  public readonly _subcategoryOption: Locator;
  public readonly _assigmentOption: Locator;
  public readonly _eventsOption: Locator;
  public readonly _stageField: Locator;

  public readonly _submitButton: Locator;

  constructor(page: Page) {
    //Customer
    this._customerLoockupField = page.getByTestId("customerField");
    this._projectNameField = page.getByLabel("Lead / Project Name *");
    //Address
    this._projectAddressField = page.getByTestId("addressField");
    this._attachmmentField = page
      .getByTitle("Attachments")
      .locator("ion-label")
      .nth(1);
    //Contact
    this._contactCustomerLabel = page.getByRole("tab", { name: "Customer" });
    this._influencerCustomerLabel = page.getByRole("tab", {
      name: "Influencer",
    });
    this._contactLookupField = page
      .getByTitle("Contact")
      .locator("ion-label")
      .nth(1);
    this._influencerLookupField = page
      .getByTitle("Influencer")
      .locator("ion-label")
      .nth(1);
    this._roleOptions = page.getByTestId("contactRoles").locator("ion-select");
    this._phoneField = page.getByLabel("Phone", { exact: true });
    this._emailField = page.getByLabel("Email", { exact: true });
    //General
    this._siteOptions = page.getByTestId("siteField").locator("ion-select");
    this._serviceLineOptions = page.getByTestId("serviceLineOptions");
    this._oportunityTipeOptions = page.getByTestId("opportunityTypeOptions");
    this._aditionalServiceLineAnswer = page.getByTestId(
      "additionalservicelineAnswer"
    );
    this._aditionalServiceLinesOptions = page.getByTestId(
      "serviceLinesOptions"
    );
    this._sourceFundigOption = page.getByTestId("sourceFundingOptions");
    this._typeOfDamageOption = page
      .getByTestId("typeOfDamageOptions")
      .locator("ion-select");
    this._causeOfDamageOption = page.getByTestId("causeOfDamageOptions");
    this._contractField = page.getByTestId("contractOptions");
    this._leadDescriptionField = page.getByTestId("leadDescriptionField");
    this._sourceOption = page.getByTestId("sourceOptions");
    this._subcategoryOption = page.getByTestId("subCategoryOptions");
    this._assigmentOption = page.getByTestId("assignmentOptions");
    this._stageField = page.getByTestId("stageField");
    this._eventsOption = page
      .getByTestId("eventOptions")
      .locator("ion-label")
      .last();

    // this._submitButton = page.getByRole('button',{name: 'Submit'});//getByText('Submit')
    this._submitButton = page
      .locator("ion-button")
      .filter({ hasText: "Submit" });
  }

  async selectCustomerByText(text: string, page: Page) {
    await this._customerLoockupField.click();
    await page.waitForTimeout(this._interval);
    await page.getByPlaceholder("Search").click();
    await page.waitForTimeout(this._interval);
    await page.keyboard.insertText(text);
    await page.waitForTimeout(1000);
    //await expect(page.getByRole('heading', { name: text }).nth(1)).toBeVisible();
    const boton = page.getByRole("heading", { name: text }).nth(0);
    await boton.dispatchEvent("click");
    await page.waitForTimeout(this._interval);
  }

  async validateCustomerContent(text: string) {
    await expect(this._customerLoockupField).toContainText(text);
  }

  async setProjecName(text: string) {
    await expect(this._projectNameField).toBeInViewport();
    await this._projectNameField.fill(text);
  }

  async validateProjectNameContent(text: string) {
    await expect(this._projectNameField).toContainText(text);
  }

  async validateAddressFieldIsPreFilled() {
    await expect(this._projectAddressField).not.toHaveText("");
  }

  async setContactByText(text: string, page: Page) {
    await this._contactLookupField.click();
    await page.waitForTimeout(this._interval);
    const contact = page.getByRole("heading", { name: text });
    await contact.click();
    await page.waitForTimeout(this._interval);
  }

  async validateContactContent(text: string) {
    await expect(this._contactLookupField).toContainText(text);
  }

  // async fillContactLabel(contactName: string, page: Page) {
  //   //await this._contactCustomerLabel.click();
  //   await this.setContactByText(contactName, page);
  //   await page.waitForTimeout(this._interval);
  //   //await this.checkRoles(page);
  // }

  async fillContact(page: Page) {
    //await this._contactCustomerLabel.click();
    await this.setContactByText("Juney Smith", page);
    await page.waitForTimeout(this._interval);
    //await this.checkRoles(page);
  }

  async setInfluencerByText(text: string, page: Page) {
    await this._influencerLookupField.click();
    await page.waitForTimeout(this._interval);
    const contact = page.getByRole("heading", { name: text }).nth(1);
    await contact.click();
    await page.waitForTimeout(this._interval);
  }

  async validateInfluencerContent(text: string) {
    await expect(this._influencerLookupField).toContainText(text);
  }

  async fillInfluencerLabel(page: Page) {
    await this._influencerCustomerLabel.click();
    await this.setInfluencerByText("Steve Burch", page);
    await this.checkRoles(page);
  }

  async checkRoles(page: Page) {
    await this._roleOptions.scrollIntoViewIfNeeded();
    await page.waitForTimeout(this._interval);
    await this._roleOptions.click();
    await page.waitForTimeout(this._interval);
    const roles = await page.getByRole("checkbox").all();
    for (var i = 0; i < 7; i++) {
      var roleOption = await page.getByRole("checkbox").nth(i);
      // for(var roleOption of roles){
      await expect(async () => {
        await roleOption.scrollIntoViewIfNeeded();
        await roleOption.check();
      }).toPass();
    }
    await expect(page.getByRole("button", { name: "OK" })).toBeVisible();
    await page.getByRole("button", { name: "OK" }).click();
  }

  async validatePhoneEditDisabled() {
    await this._phoneField.scrollIntoViewIfNeeded();
    await expect(this._phoneField).not.toBeEditable();
  }

  async validateEmailEditDisabled() {
    await this._emailField.scrollIntoViewIfNeeded();
    await expect(this._emailField).not.toBeEditable();
  }

  async setSiteByText(site: string, page: Page) {
    await page.waitForTimeout(this._interval);
    await this._siteOptions.dispatchEvent("click");
    await page.waitForTimeout(this._interval);
    await page.getByRole("button").filter({ hasText: site }).click();
  }

  async setSiteByIndex(index: number, page: Page) {
    await page.waitForTimeout(this._interval);
    await this._siteOptions.dispatchEvent("click");
    await page.waitForTimeout(this._interval);
    const site = page.getByRole("button").nth(index);
    await site.click();
  }

  async validateSiteContent(text: string) {
    await expect(this._siteOptions).toContainText(text);
  }

  async setServiceLineOptionByText(slOption: string, page: Page) {
    await this._serviceLineOptions.scrollIntoViewIfNeeded();
    await page.waitForTimeout(this._interval);
    await this._serviceLineOptions.click();
    await page.waitForTimeout(this._interval);
    await page.getByRole("button").filter({ hasText: slOption }).click();
    await page.waitForTimeout(this._interval);
  }

  async setServiceLineOptionByIndex(index: number, page: Page) {
    await this._serviceLineOptions.scrollIntoViewIfNeeded();
    await page.waitForTimeout(this._interval);
    await this._serviceLineOptions.click();
    await page.waitForTimeout(this._interval);
    await page.getByRole("button").nth(index).click();
    await page.waitForTimeout(this._interval);
  }

  async validateServiceLineContent(text: string) {
    await expect(this._serviceLineOptions).toContainText(text);
  }

  async setOportinutyTypeByText(opportunityType: string, page: Page) {
    //await this._oportunityTipeOptions.scrollIntoViewIfNeeded();
    await page.waitForTimeout(this._interval);
    await this._oportunityTipeOptions.click();
    await page.waitForTimeout(this._interval);
    await page.getByRole("button").filter({ hasText: opportunityType }).click();
  }

  async setOportinutyTypeByIndex(index: number, page: Page) {
    await this._oportunityTipeOptions.scrollIntoViewIfNeeded();
    await page.waitForTimeout(this._interval);
    await this._oportunityTipeOptions.click();
    await page.waitForTimeout(this._interval);
    await page.getByRole("button").nth(index).click();
  }

  async validateOportunityTypeContent(text: string) {
    await expect(this._oportunityTipeOptions).toContainText(text);
  }

  async setAditionalServiceLineAnswer(answer: string, page: Page) {
    await this._aditionalServiceLineAnswer.scrollIntoViewIfNeeded();
    await page.waitForTimeout(this._interval);
    await this._aditionalServiceLineAnswer.click();
    await page.waitForTimeout(this._interval);
    await page.getByRole("button").getByText(answer, { exact: true }).click();
    await page.waitForTimeout(this._interval);
  }

  async setAditionalServiceLineAnswerByIndex(index: number, page: Page) {
    await this._aditionalServiceLineAnswer.scrollIntoViewIfNeeded();
    await page.waitForTimeout(this._interval);
    await this._aditionalServiceLineAnswer.click();
    await page.waitForTimeout(this._interval);
    await page.getByRole("button").nth(index).click();
    await page.waitForTimeout(this._interval);
  }

  async validateAditionalServiceLineAnswer(text: string) {
    await expect(this._aditionalServiceLineAnswer).toContainText(text);
  }

  async setAditionalServiceLines(page: Page) {
    await this._aditionalServiceLinesOptions.scrollIntoViewIfNeeded();
    await page.waitForTimeout(this._interval);
    await this._aditionalServiceLinesOptions.click();
    await page.waitForTimeout(this._interval);
    const aditionalServiceLines = await page.getByRole("checkbox").all();
    for (var serviceLine of aditionalServiceLines) {
      await serviceLine.check();
    }
    await expect(page.getByRole("button", { name: "OK" })).toBeVisible();
    await page.getByRole("button", { name: "OK" }).click();
  }

  async validateAditionalServiceLinesHidden(page: Page) {
    await expect(this._aditionalServiceLinesOptions).not.toBeVisible();
  }

  async iterateServiceLineGroup(page: Page) {
    for (var i = 0; i < 3; i++) {
      if (i != 0) {
        await this.setAditionalServiceLineAnswerByIndex(i, page);
        await expect(this._aditionalServiceLinesOptions).not.toBeVisible();
      } else {
        await this.setAditionalServiceLineAnswerByIndex(i, page);
        await this.setAditionalServiceLines(page);
      }
    }
  }

  async setSourceFundingByText(sourcefunding: string, page: Page) {
    await this._sourceFundigOption.scrollIntoViewIfNeeded();
    await page.waitForTimeout(this._interval);
    await this._sourceFundigOption.click();
    await page.waitForTimeout(this._interval);
    await page.getByRole("button").filter({ hasText: sourcefunding }).click();
    await page.waitForTimeout(this._interval);
  }

  async setSourceFundingByIndex(index: number, page: Page) {
    await this._sourceFundigOption.scrollIntoViewIfNeeded();
    await page.waitForTimeout(this._interval);
    await this._sourceFundigOption.click();
    await page.waitForTimeout(this._interval);
    await page.getByRole("button").nth(index).click();
    await page.waitForTimeout(this._interval);
  }

  async validateSourceFundingContent(text: string) {
    await expect(this._sourceFundigOption).toContainText(text);
  }

  async iterateSourceFundings(page: Page) {
    for (var i = 0; i < 5; i++) {
      await this.setSourceFundingByIndex(i, page);
    }
  }

  async setTypeOfDamageByText(typeofdamage: string, page: Page) {
    await this._typeOfDamageOption.scrollIntoViewIfNeeded();
    await page.waitForTimeout(this._interval);
    await this._typeOfDamageOption.dispatchEvent("click");
    await page.waitForTimeout(this._interval);
    await page.getByRole("button").filter({ hasText: typeofdamage }).click();
    await page.waitForTimeout(this._interval);
  }

  async setTypeOfDamageByIndex(index: number, page: Page) {
    await this._typeOfDamageOption.scrollIntoViewIfNeeded();
    await page.waitForTimeout(this._interval);
    await this._typeOfDamageOption.dispatchEvent("click");
    await page.waitForTimeout(this._interval);
    await page.getByRole("button").nth(index).click();
    await page.waitForTimeout(this._interval);
  }

  async validateTypeOfDamageContent(text: string) {
    await expect(this._typeOfDamageOption).toContainText(text);
  }

  async setCauseOfDamageByText(causeofdamage: string, page: Page) {
    await this._causeOfDamageOption.scrollIntoViewIfNeeded();
    await page.waitForTimeout(this._interval);
    await this._causeOfDamageOption.click();
    await page.waitForTimeout(this._interval);
    await page.getByRole("button").filter({ hasText: causeofdamage }).click();
    await page.waitForTimeout(this._interval);
  }

  async setCauseOfDamageByIndex(index: number, page: Page) {
    await this._causeOfDamageOption.scrollIntoViewIfNeeded();
    await page.waitForTimeout(this._interval);
    await this._causeOfDamageOption.click();
    await page.waitForTimeout(this._interval);
    await page.getByRole("button").nth(index).click();
    await page.waitForTimeout(this._interval);
  }

  async validateCauseOfDamageContent(text: string) {
    await expect(this._causeOfDamageOption).toContainText(text);
  }

  async iterateTypeAndCausesOfDamage(page: Page) {
    await this.setTypeOfDamageByIndex(0, page);
    for (var j = 0; j < 9; j++) {
      await this.setCauseOfDamageByIndex(j, page);
    }
    await this.setTypeOfDamageByIndex(1, page);
    for (var j = 0; j < 7; j++) {
      await this.setCauseOfDamageByIndex(j, page);
    }
    await this.setTypeOfDamageByIndex(2, page);
    await this.setCauseOfDamageByIndex(0, page);
  }

  async setContractByText(contract: string, page: Page) {
    await this._contractField.scrollIntoViewIfNeeded();
    await page.waitForTimeout(this._interval);
    await this._contractField.click();
    await page.waitForTimeout(this._interval);
    await page.getByRole("button").filter({ hasText: contract }).click();
    await page.waitForTimeout(this._interval);
  }

  async setContractByIndex(index: number, page: Page) {
    await this._contractField.scrollIntoViewIfNeeded();
    await page.waitForTimeout(this._interval);
    await this._contractField.click();
    await page.waitForTimeout(this._interval);
    await page.getByRole("button").nth(index).click();
    await page.waitForTimeout(this._interval);
  }

  async validateContractContent(text: string) {
    await expect(this._contractField).toContainText(text);
  }

  async iterateContract(page: Page) {
    for (var i = 0; i < 5; i++) {
      await this.setContractByIndex(i, page);
    }
  }

  async fillLeadDescription(text: string, page: Page) {
    await this._leadDescriptionField.click();
    await page.keyboard.insertText(text);
    await page.keyboard.press("Escape");
  }

  async validateLeadDescription(text: string) {
    await expect(this._leadDescriptionField).toContainText(text);
  }

  async setSourceOptionByText(source: string, page: Page) {
    await this._sourceOption.scrollIntoViewIfNeeded();
    await page.waitForTimeout(this._interval);
    await this._sourceOption.click();
    await page.waitForTimeout(this._interval);

    await page.getByRole("button").filter({ hasText: source }).click();
    await page.waitForTimeout(this._interval);
  }

  async setSourceOptionByIndex(index: number, page: Page) {
    await this._sourceOption.scrollIntoViewIfNeeded();
    await page.waitForTimeout(this._interval);
    await this._sourceOption.click();
    await page.waitForTimeout(this._interval);

    await page.getByRole("button").nth(index).click();
    await page.waitForTimeout(this._interval);
  }

  async validateSourceOptionContent(text: string) {
    await expect(this._sourceOption).toContainText(text);
  }

  async setSubCategoryByText(subcategory: string, page: Page) {
    //await this._subcategoryOption.scrollIntoViewIfNeeded();
    await page.waitForTimeout(this._interval);
    await this._subcategoryOption.click();
    await page.waitForTimeout(this._interval);
    await page.getByRole("button").filter({ hasText: subcategory }).click();
    await page.waitForTimeout(this._interval);
  }
  async setSubCategoryByIndex(index: number, page: Page) {
    //await this._subcategoryOption.scrollIntoViewIfNeeded();
    await page.waitForTimeout(this._interval);
    await this._subcategoryOption.click();
    await page.waitForTimeout(this._interval);
    await page.getByRole("button").nth(index).click();
    await page.waitForTimeout(this._interval);
  }

  async validateSubcategoryContent(text: string) {
    await expect(this._subcategoryOption).toContainText(text);
  }

  async iterateSourceSubcategoryGroup(page: Page) {
    //Group 1 indexes 0,1 & 4
    await this.setSourceOptionByIndex(0, page);
    await this._subcategoryOption.click();
    expect((await page.getByRole("button").all()).length).toBe(2);
    var contentFirstButton = await page.getByRole("button").first().innerText();
    console.log(contentFirstButton);
    await page.keyboard.press("Escape");
    await expect(this._subcategoryOption).toContainText(contentFirstButton);
    //--------------
    await this.setSourceOptionByIndex(1, page);
    await this._subcategoryOption.click();
    expect((await page.getByRole("button").all()).length).toBe(2);
    var contentFirstButton = await page.getByRole("button").first().innerText();
    console.log(contentFirstButton);
    await page.keyboard.press("Escape");
    await expect(this._subcategoryOption).toContainText(contentFirstButton);
    //-------------
    await this.setSourceOptionByIndex(4, page);
    await this._subcategoryOption.click();
    expect((await page.getByRole("button").all()).length).toBe(2);
    var contentFirstButton = await page.getByRole("button").first().innerText();
    console.log(contentFirstButton);
    await page.keyboard.press("Escape");
    await expect(this._subcategoryOption).toContainText(contentFirstButton);
    //Group 2 indexes 2 & 3
    await this.setSourceOptionByIndex(3, page);
    await this._subcategoryOption.click();
    await page.waitForTimeout(this._interval);
    expect((await page.getByRole("button").all()).length).toBe(8);
    await page.keyboard.press("Escape");
    for (var i = 0; i < 7; i++) {
      await this.setSourceOptionByIndex(3, page);
      await this._subcategoryOption.click();
      var contentFirstButton = await page
        .getByRole("button")
        .nth(i)
        .innerText();
      console.log(contentFirstButton);
      await page.getByRole("button").nth(i).click();
      await expect(this._subcategoryOption).toContainText(contentFirstButton);
    }
    //Group 3 index 5
    await this.setSourceOptionByIndex(5, page);
    await this._subcategoryOption.click();
    await page.waitForTimeout(this._interval);
    expect((await page.getByRole("button").all()).length).toBe(7);
    await page.keyboard.press("Escape");
    for (var i = 0; i < 6; i++) {
      await this.setSourceOptionByIndex(5, page);
      await this._subcategoryOption.click();
      await page.waitForTimeout(this._interval);
      var contentFirstButton = await page
        .getByRole("button")
        .nth(i)
        .innerText();
      console.log(contentFirstButton);
      await page.getByRole("button").nth(i).click();
      await expect(this._subcategoryOption).toContainText(contentFirstButton);
    }
  }

  async setAssigmentByText(assigment: string, page: Page) {
    await this._assigmentOption.scrollIntoViewIfNeeded();
    await page.waitForTimeout(this._interval);
    await this._assigmentOption.click();
    await page.waitForTimeout(this._interval);
    await page.getByRole("button").filter({ hasText: assigment }).click();
    await page.waitForTimeout(this._interval);
  }
  async setAssigmentByIndex(index: number, page: Page) {
    await this._assigmentOption.scrollIntoViewIfNeeded();
    await page.waitForTimeout(this._interval);
    await this._assigmentOption.click();
    await page.waitForTimeout(this._interval);
    await page.getByRole("button").nth(index).click();
    await page.waitForTimeout(this._interval);
  }

  async validateAssigmentContent(text: string) {
    await expect(this._assigmentOption).toContainText(text);
  }

  async validateStageContent(text: string) {
    await expect(this._stageField).toContainText(text);
  }

  async iterateAndValidateAssigmentStageGroup(page: Page) {
    await this.setAssigmentByIndex(0, page);
    await expect(this._stageField).toContainText("Prospect");
    await this.setAssigmentByIndex(1, page);
    await expect(this._stageField).toContainText("Qualified");
    await this.setAssigmentByIndex(2, page);
    await expect(this._stageField).toContainText("Qualified");
  }

  async setEvent(page: Page, text: string) {
    await this._eventsOption.scrollIntoViewIfNeeded();
    await page.waitForTimeout(this._interval);
    await this._eventsOption.click();
    await page.waitForTimeout(this._interval);
    await page.getByRole("heading", { name: text }).click();
  }

  async validateEventContent(text: string) {
    await expect(this._eventsOption).toContainText(text);
  }

  async submitForm(page: Page) {
    await this._submitButton.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await this._submitButton.click();
    // await this._submitButton.dispatchEvent();
  }

  async funcionPruebas(page: Page) {}
}

export default BusionessLeadPom;
