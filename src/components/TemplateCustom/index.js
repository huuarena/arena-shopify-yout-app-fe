import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs, Card, Caption, TextField, Button } from '@shopify/polaris';
import './styles.scss';
import Switch from 'react-switch';

const INITIAL_STATE = {
    tabSelected: 0,
    widgetSelected: {},

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
        widgets: state.widgets,
        templates: state.templates,
    };
}

function mapDispatchToProps(dispatch) {
    return {};
}

class TemplateCustom extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    static getDerivedStateFromProps(props, state) {
        if (Object.keys(props.widgets.selected).length > 0 && Object.keys(state.widgetSelected).length === 0) {
            return {
                widgetSelected: props.widgets.selected,
            };
        }

        return null;
    }

    handleChange = (name, value) => {
        const { widgetSelected } = this.state;
        let newWidgetSelected = { ...widgetSelected };

        switch (name) {
            case 'source_url':
                newWidgetSelected.template.source.url = value;
                this.setState({ widgetSelected: newWidgetSelected });
                break;

            case 'custom_channel_name':
                newWidgetSelected.template.layout.header.custom_channel_name.value = value;
                this.setState({ widgetSelected: newWidgetSelected });
                break;

            case 'columns':
                if (parseInt(value) > 0) {
                    newWidgetSelected.template.layout.columns_rows.columns = parseInt(value);
                    this.setState({ widgetSelected: newWidgetSelected });
                }
                break;

            case 'rows':
                if (parseInt(value) > 0) {
                    newWidgetSelected.template.layout.columns_rows.rows = parseInt(value);
                    this.setState({ widgetSelected: newWidgetSelected });
                }
                break;

            default:
                break;
        }

        console.log('newWidgetSelected :>> ', newWidgetSelected);
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
        const { widgetSelected } = this.state;

        return (
            <div className="source">
                <div className="form-group">
                    <div className="label">YOUTUBE CHANNEL URL</div>
                    <TextField
                        type="text"
                        placeholder="Youtube channel url"
                        value={widgetSelected.template.source.url}
                        onChange={value => this.handleChange('source_url', value)}
                        autoFocus
                    />
                </div>

                <div className="form-group">
                    <div className="label">SOURCE GROUPS</div>
                    <div className="btn-source-group-add">+ Add</div>
                </div>
            </div>
        );
    };

    rendenLayoutCollapse = index => {
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
        const { widgetSelected } = this.state;

        return (
            <div>
                <div className="form-group">
                    <div className="label">SHOW HEADER</div>
                    <Switch
                        height={20}
                        width={46}
                        onChange={() => {
                            let newWidgetSelected = { ...widgetSelected };
                            newWidgetSelected.template.layout.header.show = !widgetSelected.template.layout.header.show;
                            this.setState({
                                widgetSelected: newWidgetSelected,
                            });
                        }}
                        checked={widgetSelected.template.layout.header.show}
                    />
                </div>

                <div className="form-group">
                    <div className="label">HEADER LAYOUT</div>
                    <div className="btn-group">
                        {widgetSelected.template.layout.header.layout.data.map((item, index) => (
                            <div
                                className={
                                    widgetSelected.template.layout.header.layout.selected === index
                                        ? 'btn btn-selected'
                                        : 'btn'
                                }
                                key={index}
                                onClick={() => {
                                    if (widgetSelected.template.layout.header.layout.selected !== index) {
                                        let newWidgetSelected = { ...widgetSelected };
                                        newWidgetSelected.template.layout.header.layout.selected = index;
                                        this.setState({ widgetSelected: newWidgetSelected });
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
                        {Object.keys(widgetSelected.template.layout.header.elements).map((objKey, index) => (
                            <div
                                key={index}
                                className="form-control form-control-checkbox"
                                onClick={() => {
                                    let newWidgetSelected = { ...widgetSelected };
                                    newWidgetSelected.template.layout.header.elements[objKey].show = !widgetSelected
                                        .template.layout.header.elements[objKey].show;
                                    this.setState({ widgetSelected: newWidgetSelected });
                                }}
                            >
                                <input
                                    readOnly
                                    type="checkbox"
                                    checked={widgetSelected.template.layout.header.elements[objKey].show}
                                />
                                <div>{widgetSelected.template.layout.header.elements[objKey].label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="form-group">
                    <div className="label">CUSTOM CHANNEL NAME</div>
                    <TextField
                        type="text"
                        placeholder=""
                        value={widgetSelected.template.layout.header.custom_channel_name.value}
                        onChange={value => this.handleChange('custom_channel_name', value)}
                    />
                </div>

                <div className="form-group">
                    <div className="label">CUSTOM CHANNEL DESCRIPTION</div>
                    <TextField
                        type="text"
                        multiline={4}
                        placeholder=""
                        value={widgetSelected.template.layout.header.custom_channel_name.value}
                        onChange={value => this.handleChange('custom_channel_name', value)}
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
        const { widgetSelected } = this.state;

        return (
            <div>
                <div className="form-group">
                    <div className="label">COLUMNS</div>
                    <TextField
                        type="number"
                        placeholder=""
                        value={`${widgetSelected.template.layout.columns_rows.columns}`}
                        onChange={value => this.handleChange('columns', value)}
                    />
                </div>

                <div className="form-group">
                    <div className="label">ROWS</div>
                    <TextField
                        type="number"
                        placeholder=""
                        value={`${widgetSelected.template.layout.columns_rows.rows}`}
                        onChange={value => this.handleChange('rows', value)}
                    />
                </div>
            </div>
        );
    };

    renderLayoutVideo = () => {
        const { widgetSelected } = this.state;

        return (
            <div>
                <div className="form-group">
                    <div className="label">VIDEO LAYOUT</div>
                    <div className="btn-group">
                        {widgetSelected.template.layout.video.layout.data.map((item, index) => (
                            <div
                                className={
                                    widgetSelected.template.layout.video.layout.selected === index
                                        ? 'btn btn-selected'
                                        : 'btn'
                                }
                                key={index}
                                onClick={() => {
                                    if (widgetSelected.template.layout.video.layout.selected !== index) {
                                        let newWidgetSelected = { ...widgetSelected };
                                        newWidgetSelected.template.layout.video.layout.selected = index;
                                        this.setState({ widgetSelected: newWidgetSelected });
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
                        {Object.keys(widgetSelected.template.layout.video.elements).map((objKey, index) => (
                            <div
                                key={index}
                                className="form-control form-control-checkbox"
                                onClick={() => {
                                    let newWidgetSelected = { ...widgetSelected };
                                    newWidgetSelected.template.layout.video.elements[objKey].show = !widgetSelected
                                        .template.layout.video.elements[objKey].show;
                                    this.setState({ widgetSelected: newWidgetSelected });
                                }}
                            >
                                <input
                                    readOnly
                                    type="checkbox"
                                    checked={widgetSelected.template.layout.video.elements[objKey].show}
                                />
                                <div>{widgetSelected.template.layout.video.elements[objKey].label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="form-group">
                    <div className="label">PLAY MODE</div>
                    <div className="btn-group">
                        {widgetSelected.template.layout.video.mode.data.map((item, index) => (
                            <div
                                className={
                                    widgetSelected.template.layout.video.mode.selected === index
                                        ? 'btn btn-selected'
                                        : 'btn'
                                }
                                key={index}
                                onClick={() => {
                                    if (widgetSelected.template.layout.video.mode.selected !== index) {
                                        let newWidgetSelected = { ...widgetSelected };
                                        newWidgetSelected.template.layout.video.mode.selected = index;
                                        this.setState({ widgetSelected: newWidgetSelected });
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
        const { widgetSelected } = this.state;

        return (
            <div>
                <div className="form-group">
                    <div className="label">POPUP ELEMENTS</div>
                    <div>
                        {Object.keys(widgetSelected.template.layout.popup.elements).map((objKey, index) => (
                            <div
                                key={index}
                                className="form-control form-control-checkbox"
                                onClick={() => {
                                    let newWidgetSelected = { ...widgetSelected };
                                    newWidgetSelected.template.layout.popup.elements[objKey].show = !widgetSelected
                                        .template.layout.popup.elements[objKey].show;
                                    this.setState({ widgetSelected: newWidgetSelected });
                                }}
                            >
                                <input
                                    readOnly
                                    type="checkbox"
                                    checked={widgetSelected.template.layout.popup.elements[objKey].show}
                                />
                                <div>{widgetSelected.template.layout.popup.elements[objKey].label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="form-group">
                    <div className="label">AUTOPLAY</div>
                    <Switch
                        height={20}
                        width={46}
                        onChange={() => {
                            let newWidgetSelected = { ...widgetSelected };
                            newWidgetSelected.template.layout.popup.auto_play = !widgetSelected.template.layout.popup
                                .auto_play;
                            this.setState({
                                widgetSelected: newWidgetSelected,
                            });
                        }}
                        checked={widgetSelected.template.layout.popup.auto_play}
                    />
                </div>
            </div>
        );
    };

    renderLayoutSliderSettings = () => {
        return <div></div>;
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
        return <div></div>;
    };

    renderAdvanced = () => {
        return <div></div>;
    };

    render() {
        const { tabSelected, widgetSelected } = this.state;
        const tabs = ['Source', 'Layout', 'Colors', 'Advanced'];

        console.log('widgetSelected :>> ', widgetSelected);

        return (
            <div className="template-custom">
                <div className="tabs">
                    {tabs.map((item, index) => (
                        <div
                            key={index}
                            className={tabSelected === index ? 'tab tab-selected' : 'tab'}
                            onClick={() => (index !== tabSelected ? this.setState({ tabSelected: index }) : null)}
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

export default connect(mapStateToProps)(TemplateCustom);
