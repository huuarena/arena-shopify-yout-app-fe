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
                template: {
                    id: 'template-1599556067242',
                    label: 'Yout Channel',
                    avatar: 'https://cf.shopee.vn/file/3300e9e8f8480d5f6b72455e1d283b3b',
                    source: {
                        url: 'https://www.youtube.com/user/user-channel',
                    },
                    layout: {
                        header: {
                            show: true,
                            layout: {
                                data: ['Classic', 'Accecent', 'Minimal'],
                                selected: 0,
                            },
                            elements: {
                                logo: {
                                    label: 'Logo',
                                    show: true,
                                    url: 'https://cf.shopee.vn/file/3300e9e8f8480d5f6b72455e1d283b3b',
                                },
                                banner: {
                                    label: 'Banner',
                                    show: true,
                                    url: 'https://cf.shopee.vn/file/3300e9e8f8480d5f6b72455e1d283b3b',
                                },
                                channel_name: {
                                    label: 'Channel name',
                                    show: true,
                                    value: '',
                                },
                                channel_description: {
                                    label: 'Channel description',
                                    show: true,
                                    value: '',
                                },
                                videos_counter: {
                                    label: 'Videos counter',
                                    show: true,
                                    value: 16435,
                                },
                                views_counter: {
                                    label: 'Views counter',
                                    show: true,
                                    value: 1264351,
                                },
                                subscribers_counter: {
                                    label: 'Subscribers counter',
                                    show: true,
                                    value: 1684131685,
                                },
                                subcribe_button: {
                                    label: 'Subcribe button',
                                    show: true,
                                },
                            },
                            custom_channel_name: {
                                value: '',
                            },
                            custom_channel_description: {
                                value: '',
                            },
                            custom_channel_logo: {
                                url: '',
                            },
                            custom_channel_banner: {
                                url: '',
                            },
                        },
                        columns_rows: {
                            columns: 3,
                            rows: 3,
                        },
                        video: {
                            layout: {
                                data: ['Classic', 'Horizontal', 'Cinema'],
                                selected: 0,
                            },
                            elements: {
                                play_icon: {
                                    label: 'Play icon',
                                    show: true,
                                    url: 'https://cf.shopee.vn/file/3300e9e8f8480d5f6b72455e1d283b3b',
                                },
                                duration: {
                                    label: 'Duration',
                                    show: true,
                                    value: 16313215,
                                },
                                title: {
                                    label: 'Title',
                                    show: true,
                                    value: 113132,
                                },
                                date: {
                                    label: 'Date',
                                    show: true,
                                    value: 32132132,
                                },
                                description: {
                                    label: 'Description',
                                    show: true,
                                    value: 1513213,
                                },
                                views_counter: {
                                    label: 'Views counter',
                                    show: true,
                                    value: 15463213,
                                },
                                likes_counter: {
                                    label: 'Likes counter',
                                    show: true,
                                    value: 16413165,
                                },
                                comments_counter: {
                                    label: 'Comments counter',
                                    show: true,
                                    value: 2113545,
                                },
                            },
                            mode: {
                                data: ['Popup', 'Inline', 'Youtube'],
                                selected: 0,
                            },
                        },
                        popup: {
                            elements: {
                                title: {
                                    label: 'Title',
                                    show: true,
                                    value: '',
                                },
                                channel_logo: {
                                    label: 'Channel logo',
                                    show: true,
                                    url: '',
                                },
                                channel_name: {
                                    label: 'Channel name',
                                    show: true,
                                    value: '',
                                },
                                subcribe_button: {
                                    label: 'Subcribe button',
                                    show: true,
                                },
                                views_counter: {
                                    label: 'Views counter',
                                    show: true,
                                    value: 454534,
                                },
                                likes_counter: {
                                    label: 'Likes counter',
                                    show: true,
                                    value: 453453,
                                },
                                dislikes_counter: {
                                    label: 'Dislikes counter',
                                    show: true,
                                    value: 453453,
                                },
                                comments_counter: {
                                    label: 'Comments counter',
                                    show: true,
                                    value: 453453,
                                },
                                share_button: {
                                    label: 'Share button',
                                    show: true,
                                },
                                date: {
                                    label: 'Date',
                                    show: true,
                                    value: 453453453,
                                },
                                description: {
                                    label: 'Description',
                                    show: true,
                                    value: '',
                                },
                                description_more_button: {
                                    label: 'Description more button',
                                    show: true,
                                },
                                comments: {
                                    label: 'Comments',
                                    show: true,
                                },
                            },
                            auto_play: false,
                        },
                        slider_settings: {
                            direction: {
                                data: ['Horizontal', 'Vertical'],
                                selected: 0,
                            },
                            elements: {
                                show_navigation_arrows: {
                                    label: 'Show navigation arrows',
                                    show: false,
                                },
                                scroll_to_navigate: {
                                    label: 'Scroll to navigate',
                                    show: false,
                                },
                                drag_to_navigate: {
                                    label: 'Drag to navigate',
                                    show: false,
                                },
                                show_pagination: {
                                    label: 'Show pagination',
                                    show: false,
                                },
                                show_scrollbar: {
                                    label: 'Show scrollbar',
                                    show: false,
                                },
                                show_search_bar: {
                                    label: 'Show search bar',
                                    show: false,
                                },
                            },
                            silde_switch_speed: 600,
                            slide_switch_effect: {
                                data: ['Slide', 'Fade', 'Coverflow', 'Cube', 'Flip'],
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
            },
            {
                id: 'widget-1599556004555',
                name: 'YouTube Video App',
                created_at: 1599556004026,
                updated_at: 1599556004026,
                enabled: true,
                template: {
                    id: 'template-1599556067242',
                    label: 'Yout Channel',
                    avatar: 'https://cf.shopee.vn/file/3300e9e8f8480d5f6b72455e1d283b3b',
                    source: {
                        url: 'https://www.youtube.com/user/user-channel',
                    },
                    layout: {
                        header: {
                            show: true,
                            layout: {
                                data: ['Classic', 'Accecent', 'Minimal'],
                                selected: 0,
                            },
                            elements: {
                                logo: {
                                    label: 'Logo',
                                    show: true,
                                    url: 'https://cf.shopee.vn/file/3300e9e8f8480d5f6b72455e1d283b3b',
                                },
                                banner: {
                                    label: 'Banner',
                                    show: true,
                                    url: 'https://cf.shopee.vn/file/3300e9e8f8480d5f6b72455e1d283b3b',
                                },
                                channel_name: {
                                    label: 'Channel name',
                                    show: true,
                                    value: '',
                                },
                                channel_description: {
                                    label: 'Channel description',
                                    show: true,
                                    value: '',
                                },
                                videos_counter: {
                                    label: 'Videos counter',
                                    show: true,
                                    value: 16435,
                                },
                                views_counter: {
                                    label: 'Views counter',
                                    show: true,
                                    value: 1264351,
                                },
                                subscribers_counter: {
                                    label: 'Subscribers counter',
                                    show: true,
                                    value: 1684131685,
                                },
                                subcribe_button: {
                                    label: 'Subcribe button',
                                    show: true,
                                },
                            },
                            custom_channel_name: {
                                value: '',
                            },
                            custom_channel_description: {
                                value: '',
                            },
                            custom_channel_logo: {
                                url: '',
                            },
                            custom_channel_banner: {
                                url: '',
                            },
                        },
                        columns_rows: {
                            columns: 3,
                            rows: 3,
                        },
                        video: {
                            layout: {
                                data: ['Classic', 'Horizontal', 'Cinema'],
                                selected: 0,
                            },
                            elements: {
                                play_icon: {
                                    label: 'Play icon',
                                    show: true,
                                    url: 'https://cf.shopee.vn/file/3300e9e8f8480d5f6b72455e1d283b3b',
                                },
                                duration: {
                                    label: 'Duration',
                                    show: true,
                                    value: 16313215,
                                },
                                title: {
                                    label: 'Title',
                                    show: true,
                                    value: 113132,
                                },
                                date: {
                                    label: 'Date',
                                    show: true,
                                    value: 32132132,
                                },
                                description: {
                                    label: 'Description',
                                    show: true,
                                    value: 1513213,
                                },
                                views_counter: {
                                    label: 'Views counter',
                                    show: true,
                                    value: 15463213,
                                },
                                likes_counter: {
                                    label: 'Likes counter',
                                    show: true,
                                    value: 16413165,
                                },
                                comments_counter: {
                                    label: 'Comments counter',
                                    show: true,
                                    value: 2113545,
                                },
                            },
                            mode: {
                                data: ['Popup', 'Inline', 'Youtube'],
                                selected: 0,
                            },
                        },
                        popup: {
                            elements: {
                                title: {
                                    label: 'Title',
                                    show: true,
                                    value: '',
                                },
                                channel_logo: {
                                    label: 'Channel logo',
                                    show: true,
                                    url: '',
                                },
                                channel_name: {
                                    label: 'Channel name',
                                    show: true,
                                    value: '',
                                },
                                subcribe_button: {
                                    label: 'Subcribe button',
                                    show: true,
                                },
                                views_counter: {
                                    label: 'Views counter',
                                    show: true,
                                    value: 454534,
                                },
                                likes_counter: {
                                    label: 'Likes counter',
                                    show: true,
                                    value: 453453,
                                },
                                dislikes_counter: {
                                    label: 'Dislikes counter',
                                    show: true,
                                    value: 453453,
                                },
                                comments_counter: {
                                    label: 'Comments counter',
                                    show: true,
                                    value: 453453,
                                },
                                share_button: {
                                    label: 'Share button',
                                    show: true,
                                },
                                date: {
                                    label: 'Date',
                                    show: true,
                                    value: 453453453,
                                },
                                description: {
                                    label: 'Description',
                                    show: true,
                                    value: '',
                                },
                                description_more_button: {
                                    label: 'Description more button',
                                    show: true,
                                },
                                comments: {
                                    label: 'Comments',
                                    show: true,
                                },
                            },
                            auto_play: false,
                        },
                        slider_settings: {
                            direction: {
                                data: ['Horizontal', 'Vertical'],
                                selected: 0,
                            },
                            elements: {
                                show_navigation_arrows: {
                                    label: 'Show navigation arrows',
                                    show: false,
                                },
                                scroll_to_navigate: {
                                    label: 'Scroll to navigate',
                                    show: false,
                                },
                                drag_to_navigate: {
                                    label: 'Drag to navigate',
                                    show: false,
                                },
                                show_pagination: {
                                    label: 'Show pagination',
                                    show: false,
                                },
                                show_scrollbar: {
                                    label: 'Show scrollbar',
                                    show: false,
                                },
                                show_search_bar: {
                                    label: 'Show search bar',
                                    show: false,
                                },
                            },
                            silde_switch_speed: 600,
                            slide_switch_effect: {
                                data: ['Slide', 'Fade', 'Coverflow', 'Cube', 'Flip'],
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
            },
        ],
        selected: 'widget-1599556004555',
    },
    templates: [],
};
