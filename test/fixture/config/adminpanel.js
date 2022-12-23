module.exports.adminpanel = {
    // auth: true
    translation: {
        locales: ['en', 'ru', 'de', 'ua'],
        path: 'wont be used',
        defaultLocale: 'en'
    },
    forms: {
        path: '../datamocks/forms',
        data: {
            example: {
                label: {
                    title: "Label",
                    type: "string",
                    value: "label1",
                    required: true,
                    tooltip: 'tooltip for label',
                    description: "some description"
                }
            }
        }
    }
}
