export const ActionTypes = Object.freeze({
    FILE: {
        name: 'File',
        uid: 'file',
        ui: {
            open: false,
            needsFocus: true,
            focusOnOpen: '#menu_add_app_file'
        }
    },
    CLI:  {
        name: 'CLI command',
        uid: 'cli',
        ui: {
            open: false,
            needsFocus: true,
            focusOnOpen: false
        }
    },
    WEB:  {
        name: 'Web link',
        uid: 'web',
        ui: {
            open: false,
            needsFocus: true,
            focusOnOpen: false
        }
    }
});
