type PageKeys =
    'LOGIN' |
    'DASHBOARD' |
    'ADD_CONTACT' |//
    'LIST_CONTACTS' | //
    'EDIT_CONTACT' | //
    'ADD_USER' | //
    'LIST_USERS' | //
    'EDIT_USER';//

export const PAGES: Record<PageKeys, string> = {
    LOGIN: '/login',
    DASHBOARD: '/dashboard',
    ADD_CONTACT: '/add-contact',
    LIST_CONTACTS: '/list-contact',
    EDIT_CONTACT: '/edit-contact',
    ADD_USER: "/add-user",
    LIST_USERS: "/list-users",
    EDIT_USER: "/edit-user",
};
