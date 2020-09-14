export const initState = {
    app_data: {
        shop_plan: '',
        app_plan: '',
    },
    app_settings: {
        wishlist_settings: {
            wishlist_enable: true,
            wishlist_product_number: 2,
            wishlist_add_class: '.add-to-wishlist, .add-product-wishlist',
            wishlist_show_class: '.show-wishlist',
        },
        compare_settings: {
            compare_enable: true,
            compare_product_number: 2,
            compare_add_class: '.add-to-compare, .add-product-compare',
            compare_show_class: '.show-compare',
            compare_options: ['vendor', 'collection', 'options', 'availability', 'rating'],
        },
    },
    pages: {
        data: [
            {
                id: 'Widgets',
                content: 'Widgets',
                accessibilityLabel: 'Widgets',
                panelID: 'Widgets',
            },
            {
                id: 'Youtube API Key',
                content: 'Youtube API Key',
                accessibilityLabel: 'Youtube API Key',
                panelID: 'Youtube API Key',
            },
            {
                id: 'Preferences',
                content: 'Preferences',
                accessibilityLabel: 'Widgets',
                panelID: 'Preferences',
            },
            {
                id: 'Support',
                content: 'Support',
                accessibilityLabel: 'Widgets',
                panelID: 'Support',
            },
        ],
        selected: 0,
    },
    widgets: {
        data: [],
        selected: {},
    },
    youtube_channel: {},
    youtube_api: {
        key: '',
    },
};
