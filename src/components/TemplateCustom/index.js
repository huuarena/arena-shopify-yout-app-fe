import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Actions from './../../actions';
import { TextField } from '@shopify/polaris';
import './styles.scss';
import Switch from 'react-switch';

const INITIAL_STATE = {
    tabSelected: 0,
    layoutTabs: [
        {
            label: 'Header',
            show: false,
        },
        {
            label: 'Column & Rows',
            show: false,
        },
        {
            label: 'Video',
            show: false,
        },
        {
            label: 'Popup',
            show: false,
        },
        {
            label: 'Slider Settings',
            show: false,
        },
    ],
};

function mapStateToProps(state) {
    return {
        yout_app: state.yout_app,
        widget_selected: state.widget_selected,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch),
    };
}

class TemplateCustom extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    handleChange = (name, value) => {
        const { widget_selected, actions } = this.props;

        let newWidget = { ...widget_selected };

        switch (name) {
            case 'source_url':
                newWidget.youtube_channel_source = {
                    url: value,
                    channelId: value.slice(value.indexOf('channel/') + 8, value.length),
                };
                actions.changeWidgetSelectedAction(newWidget);
                break;

            case 'channel_name':
                newWidget.youtube_channel_custom.channel_name = value;
                actions.changeWidgetSelectedAction(newWidget);
                break;

            case 'channel_description':
                newWidget.youtube_channel_custom.channel_description = value;
                actions.changeWidgetSelectedAction(newWidget);
                break;

            case 'columns':
                if (parseInt(value) > 0) {
                    newWidget.setting.layout.columns_rows.columns = parseInt(value);
                    actions.changeWidgetSelectedAction(newWidget);
                }
                break;

            case 'rows':
                if (parseInt(value) > 0) {
                    newWidget.setting.layout.columns_rows.rows = parseInt(value);
                    actions.changeWidgetSelectedAction(newWidget);
                }
                break;

            case 'silde_switch_speed':
                if (parseInt(value) > 0) {
                    newWidget.setting.layout.slider_settings.silde_switch_speed = parseInt(value);
                    actions.changeWidgetSelectedAction(newWidget);
                }
                break;

            case 'autoplay_speed':
                if (parseInt(value) > 0) {
                    newWidget.setting.layout.slider_settings.autoplay_speed = parseInt(value);
                    actions.changeWidgetSelectedAction(newWidget);
                }
                break;

            default:
                break;
        }
    };

    renderTabComponent = () => {
        const { tabSelected } = this.state;

        switch (tabSelected) {
            case 0:
                return this.renderSource();

            case 1:
                return this.renderLayout();

            case 2:
                return this.renderColors();

            case 3:
                return this.renderAdvanced();

            default:
                return this.renderSource();
        }
    };

    renderSource = () => {
        const { widget_selected } = this.props;

        return (
            <div className="source">
                <div className="form-group">
                    <div className="label">YOUTUBE CHANNEL URL</div>
                    <TextField
                        type="text"
                        placeholder="Youtube channel url"
                        value={widget_selected.youtube_channel_source.url}
                        onChange={(value) => this.handleChange('source_url', value)}
                        autoFocus
                    />
                </div>

                <div className="form-group">
                    <div className="label">SOURCE GROUPS</div>
                    <div className="btn-source-group-add">
                        <div className="icon-add" />
                        <div>ADD</div>
                    </div>
                </div>
            </div>
        );
    };

    rendenLayoutCollapse = (index) => {
        switch (index) {
            case 0:
                return this.renderLayoutHeader();

            case 1:
                return this.renderLayoutColumnAndRows();

            case 2:
                return this.renderLayoutVideo();

            case 3:
                return this.renderLayoutPopup();

            case 4:
                return this.renderLayoutSliderSettings();

            default:
                return;
        }
    };

    renderLayoutHeader = () => {
        const { widget_selected, actions } = this.props;

        return (
            <div>
                <div className="form-group">
                    <div className="label">SHOW HEADER</div>
                    <Switch
                        height={20}
                        width={46}
                        onChange={() => {
                            let newWidget = { ...widget_selected };
                            newWidget.setting.layout.header.show = !widget_selected.setting.layout
                                .header.show;
                            actions.changeWidgetSelectedAction(newWidget);
                        }}
                        checked={widget_selected.setting.layout.header.show}
                    />
                </div>

                <div className="form-group">
                    <div className="label">HEADER LAYOUT</div>
                    <div className="btn-group">
                        {widget_selected.setting.layout.header.layout.data.map((item, index) => (
                            <div
                                className={
                                    widget_selected.setting.layout.header.layout.selected === index
                                        ? 'btn btn-selected'
                                        : 'btn'
                                }
                                key={index}
                                onClick={() => {
                                    if (
                                        widget_selected.setting.layout.header.layout.selected !==
                                        index
                                    ) {
                                        let newWidget = { ...widget_selected };
                                        newWidget.setting.layout.header.layout.selected = index;
                                        actions.changeWidgetSelectedAction(newWidget);
                                    }
                                }}
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="form-group">
                    <div className="label">HEADER ELEMENTS</div>
                    <div>
                        {Object.keys(widget_selected.setting.layout.header.elements).map(
                            (objKey, index) => (
                                <div
                                    key={index}
                                    className="form-control form-control-checkbox"
                                    onClick={() => {
                                        let newWidget = { ...widget_selected };
                                        newWidget.setting.layout.header.elements[
                                            objKey
                                        ].show = !widget_selected.setting.layout.header.elements[
                                            objKey
                                        ].show;
                                        actions.changeWidgetSelectedAction(newWidget);
                                    }}
                                >
                                    <input
                                        readOnly
                                        type="checkbox"
                                        checked={
                                            widget_selected.setting.layout.header.elements[objKey]
                                                .show
                                        }
                                    />
                                    <div>
                                        {
                                            widget_selected.setting.layout.header.elements[objKey]
                                                .label
                                        }
                                    </div>
                                </div>
                            ),
                        )}
                    </div>
                </div>

                <div className="form-group">
                    <div className="label">CUSTOM CHANNEL NAME</div>
                    <TextField
                        type="text"
                        placeholder=""
                        value={widget_selected.youtube_channel_custom.channel_name}
                        onChange={(value) => this.handleChange('channel_name', value)}
                    />
                </div>

                <div className="form-group">
                    <div className="label">CUSTOM CHANNEL DESCRIPTION</div>
                    <TextField
                        type="text"
                        multiline={4}
                        placeholder=""
                        value={widget_selected.youtube_channel_custom.channel_description}
                        onChange={(value) => this.handleChange('channel_description', value)}
                    />
                </div>

                <div className="form-group">
                    <div className="label">CUSTOM CHANNEL LOGO URL (100X100)</div>
                    <div className="btn-upload">
                        <div className="icon-upload" />
                        <div>Upload</div>
                    </div>
                </div>

                <div className="form-group">
                    <div className="label">CUSTOM CHANNEL BANNER URL (2120X352)</div>
                    <div className="btn-upload">
                        <div className="icon-upload" />
                        <div>Upload</div>
                    </div>
                </div>
            </div>
        );
    };

    renderLayoutColumnAndRows = () => {
        const { widget_selected } = this.props;

        return (
            <div>
                <div className="form-group">
                    <div className="label">COLUMNS</div>
                    <TextField
                        type="number"
                        placeholder=""
                        value={`${widget_selected.setting.layout.columns_rows.columns}`}
                        onChange={(value) => this.handleChange('columns', value)}
                    />
                </div>

                <div className="form-group">
                    <div className="label">ROWS</div>
                    <TextField
                        type="number"
                        placeholder=""
                        value={`${widget_selected.setting.layout.columns_rows.rows}`}
                        onChange={(value) => this.handleChange('rows', value)}
                    />
                </div>
            </div>
        );
    };

    renderLayoutVideo = () => {
        const { widget_selected, actions } = this.props;

        return (
            <div>
                <div className="form-group">
                    <div className="label">VIDEO LAYOUT</div>
                    <div className="btn-group">
                        {widget_selected.setting.layout.video.layout.data.map((item, index) => (
                            <div
                                className={
                                    widget_selected.setting.layout.video.layout.selected === index
                                        ? 'btn btn-selected'
                                        : 'btn'
                                }
                                key={index}
                                onClick={() => {
                                    if (
                                        widget_selected.setting.layout.video.layout.selected !==
                                        index
                                    ) {
                                        let newWidget = { ...widget_selected };
                                        newWidget.setting.layout.video.layout.selected = index;
                                        actions.changeWidgetSelectedAction(newWidget);
                                    }
                                }}
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="form-group">
                    <div className="label">VIDEO ELEMENTS</div>
                    <div>
                        {Object.keys(widget_selected.setting.layout.video.elements).map(
                            (objKey, index) => (
                                <div
                                    key={index}
                                    className="form-control form-control-checkbox"
                                    onClick={() => {
                                        let newWidget = { ...widget_selected };
                                        newWidget.setting.layout.video.elements[
                                            objKey
                                        ].show = !widget_selected.setting.layout.video.elements[
                                            objKey
                                        ].show;
                                        actions.changeWidgetSelectedAction(newWidget);
                                    }}
                                >
                                    <input
                                        readOnly
                                        type="checkbox"
                                        checked={
                                            widget_selected.setting.layout.video.elements[objKey]
                                                .show
                                        }
                                    />
                                    <div>
                                        {
                                            widget_selected.setting.layout.video.elements[objKey]
                                                .label
                                        }
                                    </div>
                                </div>
                            ),
                        )}
                    </div>
                </div>

                <div className="form-group">
                    <div className="label">PLAY MODE</div>
                    <div className="btn-group">
                        {widget_selected.setting.layout.video.mode.data.map((item, index) => (
                            <div
                                className={
                                    widget_selected.setting.layout.video.mode.selected === index
                                        ? 'btn btn-selected'
                                        : 'btn'
                                }
                                key={index}
                                onClick={() => {
                                    if (
                                        widget_selected.setting.layout.video.mode.selected !== index
                                    ) {
                                        let newWidget = { ...widget_selected };
                                        widget_selected.setting.layout.video.mode.selected = index;
                                        actions.changeWidgetSelectedAction(newWidget);
                                    }
                                }}
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    renderLayoutPopup = () => {
        const { widget_selected, actions } = this.props;

        return (
            <div>
                <div className="form-group">
                    <div className="label">POPUP ELEMENTS</div>
                    <div>
                        {Object.keys(widget_selected.setting.layout.popup.elements).map(
                            (objKey, index) => (
                                <div
                                    key={index}
                                    className="form-control form-control-checkbox"
                                    onClick={() => {
                                        let newWidget = { ...widget_selected };
                                        newWidget.setting.layout.popup.elements[
                                            objKey
                                        ].show = !widget_selected.setting.layout.popup.elements[
                                            objKey
                                        ].show;
                                        actions.changeWidgetSelectedAction(newWidget);
                                    }}
                                >
                                    <input
                                        readOnly
                                        type="checkbox"
                                        checked={
                                            widget_selected.setting.layout.popup.elements[objKey]
                                                .show
                                        }
                                    />
                                    <div>
                                        {
                                            widget_selected.setting.layout.popup.elements[objKey]
                                                .label
                                        }
                                    </div>
                                </div>
                            ),
                        )}
                    </div>
                </div>

                <div className="form-group">
                    <div className="label">AUTOPLAY</div>
                    <Switch
                        height={20}
                        width={46}
                        onChange={() => {
                            let newWidget = { ...widget_selected };
                            newWidget.setting.layout.popup.auto_play = !widget_selected.setting
                                .layout.popup.auto_play;
                            actions.changeWidgetSelectedAction(newWidget);
                        }}
                        checked={widget_selected.setting.layout.popup.auto_play}
                    />
                </div>
            </div>
        );
    };

    renderLayoutSliderSettings = () => {
        const { widget_selected, actions } = this.props;

        return (
            <div>
                <div className="form-group">
                    <div className="label">DIRECTION</div>
                    <div className="btn-group">
                        {widget_selected.setting.layout.slider_settings.direction.data.map(
                            (item, index) => (
                                <div
                                    className={
                                        widget_selected.setting.layout.slider_settings.direction
                                            .selected === index
                                            ? 'btn btn-selected'
                                            : 'btn'
                                    }
                                    key={index}
                                    onClick={() => {
                                        if (
                                            widget_selected.setting.layout.slider_settings.direction
                                                .selected !== index
                                        ) {
                                            let newWidget = { ...widget_selected };
                                            newWidget.setting.layout.slider_settings.direction.selected = index;
                                            actions.changeWidgetSelectedAction(newWidget);
                                        }
                                    }}
                                >
                                    {item}
                                </div>
                            ),
                        )}
                    </div>
                </div>

                {Object.keys(widget_selected.setting.layout.slider_settings.elements).map(
                    (objKey) => (
                        <div className="form-group" key={objKey}>
                            <div className="label">
                                {
                                    widget_selected.setting.layout.slider_settings.elements[objKey]
                                        .label
                                }
                            </div>
                            <Switch
                                height={20}
                                width={46}
                                onChange={() => {
                                    let newWidget = { ...widget_selected };
                                    newWidget.setting.layout.slider_settings.elements[
                                        objKey
                                    ].show = !widget_selected.setting.layout.slider_settings
                                        .elements[objKey].show;
                                    actions.changeWidgetSelectedAction(newWidget);
                                }}
                                checked={
                                    widget_selected.setting.layout.slider_settings.elements[objKey]
                                        .show
                                }
                            />
                        </div>
                    ),
                )}

                <div className="divider" />

                <div className="form-group">
                    <div className="label">SLIDE SWITCH SPEED (MS)</div>
                    <TextField
                        type="number"
                        placeholder=""
                        value={`${widget_selected.setting.layout.slider_settings.silde_switch_speed}`}
                        onChange={(value) => this.handleChange('silde_switch_speed', value)}
                    />
                </div>

                <div className="form-group">
                    <div className="label">SLIDE SWITCH EFFECT</div>
                    <select
                        value={
                            widget_selected.setting.layout.slider_settings.slide_switch_effect
                                .selected
                        }
                        onChange={(e) => {
                            if (
                                parseInt(e.target.value) !==
                                widget_selected.setting.layout.slider_settings.slide_switch_effect
                                    .selected
                            ) {
                                let newWidget = { ...widget_selected };
                                newWidget.setting.layout.slider_settings.slide_switch_effect.selected = parseInt(
                                    e.target.value,
                                );
                                actions.changeWidgetSelectedAction(newWidget);
                            }
                        }}
                    >
                        {widget_selected.setting.layout.slider_settings.slide_switch_effect.data.map(
                            (item, index) => (
                                <option key={index} value={index}>
                                    {item}
                                </option>
                            ),
                        )}
                    </select>
                </div>

                <div className="form-group">
                    <div className="label">FREE MODE</div>
                    <Switch
                        height={20}
                        width={46}
                        onChange={() => {
                            let newWidget = { ...widget_selected };
                            newWidget.setting.layout.slider_settings.free_mode = !widget_selected
                                .setting.layout.slider_settings.free_mode;
                            actions.changeWidgetSelectedAction(newWidget);
                        }}
                        checked={widget_selected.setting.layout.slider_settings.free_mode}
                    />
                </div>

                <div className="divider" />

                <div className="form-group">
                    <div className="label">AUTOPLAY SPEED (MS)</div>
                    <TextField
                        type="number"
                        placeholder=""
                        value={`${widget_selected.setting.layout.slider_settings.autoplay_speed}`}
                        onChange={(value) => this.handleChange('autoplay_speed', value)}
                    />
                </div>

                <div className="form-group">
                    <div className="label">PAUSE AUTOPLAY ON HOVER</div>
                    <Switch
                        height={20}
                        width={46}
                        onChange={() => {
                            let newWidget = { ...widget_selected };
                            newWidget.setting.layout.slider_settings.pause_autoplay_on_hover = !widget_selected
                                .setting.layout.slider_settings.pause_autoplay_on_hover;
                            actions.changeWidgetSelectedAction(newWidget);
                        }}
                        checked={
                            widget_selected.setting.layout.slider_settings.pause_autoplay_on_hover
                        }
                    />
                </div>
            </div>
        );
    };

    renderLayout = () => {
        const { layoutTabs } = this.state;

        return (
            <div className="layout">
                {layoutTabs.map((item, index) => (
                    <div key={index}>
                        <div
                            className="btn-collapse"
                            onClick={() => {
                                let newLayoutTabs = [...layoutTabs];
                                newLayoutTabs[index].show = !layoutTabs[index].show;
                                this.setState({ layoutTabs: newLayoutTabs });
                            }}
                        >
                            <span>{item.label}</span>
                            <div className={layoutTabs[index].show ? 'icon icon-down' : 'icon'} />
                        </div>

                        <div className="collapse-block">
                            {Boolean(layoutTabs[index].show) && this.rendenLayoutCollapse(index)}
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    renderColors = () => {
        const { widget_selected, actions } = this.props;

        return (
            <div>
                <div className="form-group">
                    <div className="label">SLIDE SWITCH EFFECT</div>
                    <select
                        value={widget_selected.setting.colors.scheme.selected}
                        onChange={(e) => {
                            if (
                                parseInt(e.target.value) !==
                                widget_selected.setting.colors.scheme.selected
                            ) {
                                let newWidget = { ...widget_selected };
                                newWidget.setting.colors.scheme.selected = parseInt(e.target.value);
                                actions.changeWidgetSelectedAction(newWidget);
                            }
                        }}
                    >
                        {widget_selected.setting.colors.scheme.data.map((item, index) => (
                            <option key={index} value={index}>
                                {item}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        );
    };

    renderAdvanced = () => {
        return <div></div>;
    };

    render() {
        const { tabSelected } = this.state;
        const tabs = ['Source', 'Layout', 'Colors', 'Advanced'];

        return (
            <div className="template-custom">
                <div className="tabs">
                    {tabs.map((item, index) => (
                        <div
                            key={index}
                            className={tabSelected === index ? 'tab tab-selected' : 'tab'}
                            onClick={() =>
                                index !== tabSelected ? this.setState({ tabSelected: index }) : null
                            }
                        >
                            <div className="tab-body">{item}</div>
                        </div>
                    ))}
                </div>

                <div className="template-custom-body">{this.renderTabComponent()}</div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TemplateCustom);
