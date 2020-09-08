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
            compare_options: [
                'vendor',
                'collection',
                'options',
                'availability',
                'rating',
            ],
        },
    },
    page_tabs: {
        tabs: [
            {
                id: 'Widgets',
                content: 'Widgets',
                accessibilityLabel: 'Widgets',
                panelID: 'Widgets',
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
        current_page: 0,
    },
    widgets: {
        data: [
            {
                id: 'widget-1599556004026',
                name: 'YouTube Video App',
                created_at: 1599556004026,
                updated_at: 1599556004026,
                enabled: true,
                template: 'template-1599556067242',
            },
        ],
        selected: {},
    },
    templates: [
        {
            id: 'template-1599556067242',
            label: 'Yout Channel',
            avatar:
                'https://cf.shopee.vn/file/3300e9e8f8480d5f6b72455e1d283b3b',
            source: {
                url: 'https://www.youtube.com/user/user-channel',
            },
            layout: {
                header: {
                    show: true,
                    layout: {
                        layouts: ['Classic', 'Accecent', 'Minimal'],
                        selected: 0,
                    },
                    elements: {
                        logo: {
                            show: true,
                            url:
                                'https://cf.shopee.vn/file/3300e9e8f8480d5f6b72455e1d283b3b',
                        },
                        banner: {
                            show: true,
                            url:
                                'https://cf.shopee.vn/file/3300e9e8f8480d5f6b72455e1d283b3b',
                        },
                        channel_name: {
                            show: true,
                            value: '',
                        },
                        channel_description: {
                            show: true,
                            value: '',
                        },
                        videos_counter: {
                            show: true,
                            value: 16435,
                        },
                        views_counter: {
                            show: true,
                            value: 1264351,
                        },
                        subscribers_counter: {
                            show: true,
                            value: 1684131685,
                        },
                        subcribe_button: {
                            show: true,
                        },
                    },
                },
                columns_rows: {
                    columns: 3,
                    rows: 3,
                },
                video: {
                    layout: {
                        layouts: ['Classic', 'Horizontal', 'Cinema'],
                        selected: 0,
                    },
                    elements: {
                        play_icon: {
                            show: true,
                            url:
                                'https://cf.shopee.vn/file/3300e9e8f8480d5f6b72455e1d283b3b',
                        },
                        duration: {
                            show: true,
                            value: 16313215,
                        },
                        title: {
                            show: true,
                            value: 113132,
                        },
                        date: {
                            show: true,
                            value: 32132132,
                        },
                        description: {
                            show: true,
                            value: 1513213,
                        },
                        views_counter: {
                            show: true,
                            value: 15463213,
                        },
                        likes_counter: {
                            show: true,
                            value: 16413165,
                        },
                        comments_counter: {
                            show: true,
                            value: 2113545,
                        },
                    },
                    mode: {
                        modes: ['Popup', 'Inline', 'Youtube'],
                        selected: 0,
                    },
                    popup: {
                        title: {
                            show: true,
                            value: '',
                        },
                        channel_logo: {
                            show: true,
                            url: '',
                        },
                        channel_name: {
                            show: true,
                            value: '',
                        },
                        subcribe_button: {
                            show: true,
                        },
                        views_counter: {
                            show: true,
                            value: 454534,
                        },
                        likes_counter: {
                            show: true,
                            value: 453453,
                        },
                        dislikes_counter: {
                            show: true,
                            value: 453453,
                        },
                        comments_counter: {
                            show: true,
                            value: 453453,
                        },
                        share_button: {
                            show: true,
                        },
                        date: {
                            show: true,
                            value: 453453453,
                        },
                        description: {
                            show: true,
                            value: '',
                        },
                        description_more_button: {
                            show: true,
                        },
                        comments: {
                            show: true,
                        },
                    },
                    auto_play: Boolean,
                },
                slider_settings: {
                    direction: {
                        directions: ['Horizontal', 'Vertical'],
                        selected: 0,
                    },
                    show_navigation_arrows: true,
                    scroll_to_navigate: false,
                    drag_to_navigate: true,
                    show_pagination: true,
                    show_scrollbar: false,
                    show_search_bar: false,
                    silde_switch_speed: 600,
                    slide_switch_effect: {
                        effects: ['Slide', 'Fade', 'Coverflow', 'Cube', 'Flip'],
                        selected: 0,
                    },
                    free_mode: false,
                    autoplay_speed: 0,
                    pause_autoplay_on_hover: false,
                },
            },
            colors: {
                scheme: {
                    schemes: ['Default', 'Dark', 'Red', 'Deep blue', 'Custom'],
                },
                header: {
                    background: 'rgb(197, 17, 9)',
                    banner_overpay: 'rgb(197, 17, 9)',
                    channel_name: 'rgb(255, 255, 255)',
                    channel_name_on_hover: 'rgb(255, 255, 255)',
                    channel_description: 'rgb(255, 255, 255)',
                    description_links: 'rgb(255, 255, 255)',
                    description_links_on_hover: 'rgb(255, 255, 255)',
                    header_counter: 'rgb(255, 255, 255)',
                },
                menu: {
                    background: 'rgb(230, 33, 23)',
                    groups_link: 'rgba(255, 255, 255, 0.6)',
                    groups_link_on_hover: 'rgba(255, 255, 255, 0.8)',
                    groups_active_link: 'rgb(255, 255, 255)',
                    groups_highlight_on_hover: 'rgb(255, 255, 255)',
                    groups_highlight_active: 'rgb(255, 255, 255)',
                },
                video: {
                    video_overlay: 'rgb(255, 255, 255)',
                    video_play_icon: 'rgb(255, 255, 255)',
                    video_play_icon_on_hover: 'rgb(255, 255, 255)',
                    video_duration: 'rgb(255, 255, 255)',
                    video_duration_background: 'rgb(255, 255, 255)',
                    video_title: 'rgb(255, 255, 255)',
                    video_title_on_hover: 'rgb(255, 255, 255)',
                    video_date: 'rgb(255, 255, 255)',
                    video_description: 'rgb(255, 255, 255)',
                    video_description_anchors: 'rgb(255, 255, 255)',
                    video_description_anchors_on_hover: 'rgb(255, 255, 255)',
                    video_counters: 'rgb(255, 255, 255)',
                },
                popup: {
                    background: 'rgb(255, 255, 255)',
                    links: 'rgb(255, 255, 255)',
                    links_on_hover: 'rgb(255, 255, 255)',
                    overlay: 'rgb(255, 255, 255)',
                    title: 'rgb(255, 255, 255)',
                    channel_name: 'rgb(255, 255, 255)',
                    channel_name_on_hover: 'rgb(255, 255, 255)',
                    views_counter: 'rgb(255, 255, 255)',
                    likes_ratio: 'rgb(255, 255, 255)',
                    dislikes_ratio: 'rgb(255, 255, 255)',
                    likes_counter: 'rgb(255, 255, 255)',
                    dislikes_counter: 'rgb(255, 255, 255)',
                    share_button: 'rgb(255, 255, 255)',
                    date: 'rgb(255, 255, 255)',
                    description: 'rgb(255, 255, 255)',
                    description_more_button: 'rgb(255, 255, 255)',
                    description_more_button_on_hover: 'rgb(255, 255, 255)',
                    comments_passed_time: 'rgb(255, 255, 255)',
                    comments_likes: 'rgb(255, 255, 255)',
                    comments_text: 'rgb(255, 255, 255)',
                    controls: 'rgb(255, 255, 255)',
                    controls_on_hover: 'rgb(255, 255, 255)',
                    mobile_controls: 'rgb(255, 255, 255)',
                    mobile_controls_background: 'rgb(255, 255, 255)',
                },
                slider: {
                    content_background: 'rgb(255, 255, 255)',
                    content_arrows: 'rgb(255, 255, 255)',
                    content_arrows_on_hover: 'rgb(255, 255, 255)',
                    content_arrow_background: 'rgb(255, 255, 255)',
                    content_arrow_background_on_hover: 'rgb(255, 255, 255)',
                    content_scrollbar_background: 'rgb(255, 255, 255)',
                    content_scrollbar_slider_background: 'rgb(255, 255, 255)',
                },
            },
        },
    ],
};
