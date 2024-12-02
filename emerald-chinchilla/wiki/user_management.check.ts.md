# **Test File for `user_management.check.ts`**

## **File Path**

`__checks__/user_management.check.ts`

## **Purpose/Requirement**

Ensure the proper functioning of the **User Management** module. Verify that all key functionalities, including navigation, user interaction, role management, and document handling, meet the defined requirements.

## **Test Prerequisites**

- The user must be authenticated.
- Access to the **User Management** page requires login credentials.

## **Scenarios Covered**

### **1. Route Access**

#### Test Cases:

- **Case 1.1:** Ensure unauthenticated users are redirected to the login page when trying to access the User Management route.
- **Case 1.2:** Validate that authenticated users with appropriate roles can access the User Management route.
- **Case 1.3:** Verify that users without proper permissions are denied access to the route.

### **2. Landing Page**

#### Test Cases:

- **Case 2.1:** Validate that all users are displayed in the grid upon loading the page.
- **Case 2.2:** Verify that default columns (e.g., Name, Email, Role) are visible and populated.

### **3. Grid Tests**

#### Test Cases:

- **Case 3.1:** Ensure search functionality works for Name, Email, and Role.
- **Case 3.2:** Test applying filters (e.g., by role or status) modifies the grid data as expected.
- **Case 3.3:** Validate sorting columns (e.g., ascending and descending by Name, Role, Last Login).
- **Case 3.4:** Confirm that clicking "View" in any row opens the user’s detail page.

### **4. User Details**

#### Test Cases:

- **Case 4.1:** Ensure the user detail page loads the correct user data (e.g., name, email, role, last login).
- **Case 4.2:** Verify that all fields are read-only unless editable.

### **5. Role Management**

#### Test Cases:

- **Case 5.1:** Test adding one role to a user.
- **Case 5.2:** Test adding multiple roles to a user and ensure they are displayed.
- **Case 5.3:** Validate removing one role from a user.
- **Case 5.4:** Verify an error message is displayed if attempting to assign a duplicate role.
- **Case 5.5:** Ensure role updates are reflected immediately or after refreshing the grid.

### **6. Data Modification**

#### Test Cases:

- **Case 6.1:** Validate that non-editable fields are grayed out or otherwise visually distinct.
- **Case 6.2:** Test attempting to modify read-only fields and confirm the system prevents changes.

### **7. Documents Management**

#### Test Cases:

- **Case 7.1:** Verify that all documents linked to the user are displayed.
- **Case 7.2:** Test previewing a document without downloading it.
- **Case 7.3:** Validate uploading a new document to the user's profile and confirming its appearance in the document list.
- **Case 7.4:** Ensure existing documents can be downloaded.
- **Case 7.5:** Test attempting to upload invalid file types and validate the error message.

### **8. Notes Management**

#### Test Cases:

- **Case 8.1:** Validate that all notes linked to a user are visible.
- **Case 8.2:** Test filtering notes by date or category and confirm the results update.
- **Case 8.3:** Ensure adding a new note is reflected in the notes list.
- **Case 8.4:** Validate editing an existing note and confirm the changes are saved.

### **9. History Tracking**

#### Test Cases:

- **Case 9.1:** Verify that the History tab is accessible.
- **Case 9.2:** Confirm all relevant user actions and system changes are logged.
- **Case 9.3:** Validate filtering the history by action type or date.

## **Test File**

- [View the test file on GitHub](https://github.com/Alejandro-Mota-Cotton/Test/blob/main/emerald-chinchilla/__checks__/cotton_cloud/user_management.spec.ts)
