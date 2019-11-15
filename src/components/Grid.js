import React from 'react';
import moment from 'moment';
import connect from "react-redux/es/connect/connect";
import { Table, Input, Select, InputNumber, DatePicker, Button, Modal, Radio } from 'antd';
import ExportExcel from './export'

const { Option } = Select;
const { RangePicker } = DatePicker;
const ButtonGroup = Button.Group;


const options1 = [
    'Ascending',
    'Descending',
];

const options2 = [
    'VendorID',
    'ArticleNumber',
    'None',
];

class Grid extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            inputStart: null,
            inputFinish: null,
            dataState: [],
            cartItem: [],
            loading: false,
            isGrouping: false,
            isSearching: false,
            isFiltering: false,
            expandedRowData: [],
            groupingTitle: '',
            cartModalVisible: false
        };

        this.handleFilteringByDate = this.handleFilteringByDate.bind(this);
        this.groupBy = this.groupBy.bind(this);
        this.handleFiltering = this.handleFiltering.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.onChangeGroup1 = this.onChangeGroup1.bind(this);
        this.onChangeGroup2 = this.onChangeGroup2.bind(this);
        this.filteringGroupBy = this.filteringGroupBy.bind(this);

    }


    handleFilteringByDate(event) {

        let { data } = this.props;
        let startDate = moment(event[0]) * 1000;
        let endDate = moment(event[1]) * 1000;


        data = data.filter((item) => {
            let date = moment(item.OrderDate, "DD/MM/YYYY") * 1000;
            return date >= startDate && date <= endDate;
        });
        this.setState({
            dataState: data,
            isFiltering: true
        })


    }

    filteringGroupBy(collection, property) {
        var i = 0, val, index,
            values = [], result = [];

        for (; i < collection.length; i++) {
            val = collection[i][property];

            index = values.indexOf(val);
            if (index > -1)
                result[index].push(collection[i]);
            else {
                values.push(val);
                result.push([collection[i]]);
            }
        }

        return result;
    }

    handleFiltering(values, key) {

        let dataFilt = [];

        for (let i = 0; i < this.props.data.length; i++) {
            if (values.includes(this.props.data[i][key])) {
                dataFilt.push(this.props.data[i])
            }
        }

        this.setState({
            dataState: dataFilt
        })
    }

    setCartModalVisible(cartModalVisible) {
        this.setState({ cartModalVisible });
    }


    handleSearch(e) {

        let { data } = this.props;

        let isSearching = e.target.value.length;

        data = data.filter((item) => {
            return item.VendorName.toLowerCase().match(e.target.value.toLowerCase());
        });

        this.setState({
            dataState: data,
            isSearching
        })

    };

    groupBy(collection, property) {
        let i = 0, val, index,
            values = [], result = [];
        for (; i < collection.length; i++) {
            val = collection[i][property];
            index = values.indexOf(val);
            if (index > -1)
                result[index].push(collection[i]);
            else {
                values.push(val);
                result.push([collection[i]]);
            }
        }
        return result;
    }

    setModalVisible(modalVisible) {
        this.setState({ modalVisible });
    }

    setModalVisibleAndSave(modalVisible) {
        let { value2 } = this.state;
        let { data } = this.props;

        let title = {
            name: "None",
            key: ''
        };
        switch (value2) {

            case 'ArticleNumber':
                title.title = 'Article No:';
                title.name = 'MaterialName';
                title.key = 'MaterialCode';
                break;
            case 'VendorID':
                title.title = 'Vendor No:';
                title.name = 'VendorName';
                title.key = 'VendorID';
                title.pQuantity = 'Total Proposed Quantity:';
                title.tPrice = 'Total Price:';
                break;
        }

        this.setState({
            isGrouping: value2 !== 'None',
            expandedRowData: this.filteringGroupBy(data, value2),
            groupingTitle: title,
            modalVisible
        });

    }


    onChangeGroup1(e) {
        this.setState({ value1: e.target.value });
    };

    onChangeGroup2(e) {
        this.setState({ value2: e.target.value });
        return e.target.value;
    };


    render() {
        const {
            data,
            header,
            setModal,
            isDate,
            cart,
            selectedRowKeys,
            onSelectChange,
            itemCountChange
        } = this.props;

        const {
            dataState,
            loading,
            isGrouping,
            value2,
            expandedRowData,
            groupingTitle,
            isSearching,
            isFiltering,
            cartModalVisible
        } = this.state;
        let costTotal = 0;


        let dataCart = cart.cart;


        const expandedRowRender = (row, key) => {
            console.log('const expandedRowRender = (row)', row, key);
            return <Table
                columns={header}
                pagination={false}
                showHeader={false}
                rowSelection={{
                    dataCart,
                    ['selectedRowKeys' + key]: selectedRowKeys,
                    onChange: onSelectChange
                }}
                dataSource={row}
            />;
        };

        const columns = [
            {
                title: 'Vendor Name',
                dataIndex: 'VendorName',
                key: 'VendorName',
                render: (key, row) => {
                    let tQ = 0;
                    let tP = 0;
                    for (let i = 0; i < row.length; i++) {
                        tQ += row[i].count;
                        tP += parseFloat(row[i].Price);
                    }


                    return !isGrouping ? <div>
                        <div>{row.VendorName}</div>
                        <a href="javascript:;">{row.VendorID}</a>
                    </div> : {
                            children: <div>
                                <div>{row[0][groupingTitle.name]}</div>
                                <a href="javascript:;">{groupingTitle.title + ' ' + row[0][groupingTitle.key]} {groupingTitle.pQuantity + ' ' + tQ} {groupingTitle.tPrice + ' ' + tP}</a>
                            </div>,
                            props: {
                                colSpan: 1
                            },
                        };
                },
                sorter: !isGrouping ? (a, b) => a.VendorName.length - b.VendorName.length : null,
            },
            {
                title: 'Article',
                dataIndex: 'MaterialName',
                key: 'MaterialName',
                sorter: !isGrouping ? (a, b) => a.MaterialName.length - b.MaterialName.length : null,
            },
            {
                title: 'Alt.',
                dataIndex: 'Alt.',
                key: 'Alt.',
                render: !isGrouping ? (text, row, index) => {
                    return (
                        <Button icon="menu" onClick={() => setModal(true, index)} />
                    );
                } : ''
            },
            {
                title: 'Material Group Text',
                dataIndex: 'MaterialGroupText',
                key: 'MaterialGroupText',
                sorter: !isGrouping ? (a, b) => a.MaterialGroupText.length - b.MaterialGroupText.length : null,
            },
            {
                title: 'Proposed Quantity',
                dataIndex: 'ProposedQuantity',
                key: 'ProposedQuantity',
                render: !isGrouping ? (text, row, index) => {
                    return (
                        <InputNumber min={1} max={10000} defaultValue={1}
                            onChange={() => itemCountChange(index)} />
                    );
                } : ''
            },
            {
                title: 'Ingredient Description',
                dataIndex: 'IngredientDescription',
                key: 'IngredientDescription',
                sorter: !isGrouping ? (a, b) => a.IngredientDescription.length - b.IngredientDescription.length : null,
            },
            {
                title: 'Order Unit',
                dataIndex: 'OrderUnit',
                key: 'OrderUnit',
                sorter: !isGrouping ? (a, b) => a.OrderUnit.length - b.OrderUnit.length : null,
            },
            {
                title: 'Order Date',
                dataIndex: 'OrderDate',
                key: 'OrderDate',
                sorter: !isGrouping ? (a, b) => a.OrderDate.length - b.OrderDate.length : null,
            },
            {
                title: 'Unit Price',
                dataIndex: 'Price',
                key: 'Price',
                sorter: !isGrouping ? (a, b) => a.Price.length - b.Price.length : null,
            },
            {
                title: 'Total Price',
                dataIndex: 'TotalPrice',
                key: 'TotalPrice',
                sorter: !isGrouping ? (a, b) => a.TotalPrice.length - b.TotalPrice.length : null,
            },
        ];

        return (
            <div className='container-fluid'>
                <div className="row">
                    <div className="col-md-12">
                        <div className='card'>
                            <div className={'dx-fieldset container-fluid m-0'}>
                                <div className="row m-4">
                                    {isDate && <div className={'dx-field col'}>
                                        <div className={'dx-field-value'}>
                                            <RangePicker
                                                onChange={this.handleFilteringByDate}
                                                format={'DD-MM-YYYY'}
                                            />
                                        </div>
                                    </div>}

                                    <div className={'dx-field col'}>
                                        <div className={'dx-field-value'}>
                                            <Select
                                                mode="tags"
                                                placeholder={'Choose Vendor'}
                                                style={{ width: '100%' }}
                                                onChange={(e) => this.handleFiltering(e, 'VendorName')}
                                                tokenSeparators={[',']}>
                                                {this.groupBy(data, 'VendorName').map((item, key) => (
                                                    <Option key={key}
                                                        value={item[0]['VendorName']}>{item[0]['VendorName']}</Option>

                                                ))}
                                            </Select>
                                        </div>
                                    </div>
                                    <div className={'dx-field col'}>
                                        <div className={'dx-field-value'}>
                                            <Select
                                                mode="tags"
                                                placeholder={'Choose Categories'}
                                                style={{ width: '100%' }}
                                                onChange={(e) => this.handleFiltering(e, 'IngredientDescription')}
                                                tokenSeparators={[',']}>
                                                {this.groupBy(data, 'IngredientDescription').map((item, key) => (
                                                    <Option key={key}
                                                        value={item[0]['IngredientDescription']}>{item[0]['IngredientDescription']}</Option>
                                                ))}
                                            </Select>
                                        </div>
                                    </div>
                                    <div className={'dx-field col'}>
                                        <div className={'dx-field-value'}>
                                            <Input
                                                placeholder="Search by Vendor Name"
                                                onChange={this.handleSearch}
                                                disabled={isGrouping}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="tableTopButtons text-right m-1">
                                <ButtonGroup>
                                    <Button type="primary" icon="unordered-list"
                                        onClick={() => this.setModalVisible(true)} />
                                </ButtonGroup>
                                <ButtonGroup>
                                    <ExportExcel
                                        data={dataState.length ? dataState : data}
                                    />
                                </ButtonGroup>
                            </div>
                            <Table
                                columns={columns}
                                loading={loading}
                                expandedRowRender={isGrouping ? expandedRowRender : null}
                                rowSelection={
                                    !isGrouping ? {
                                        dataCart,
                                        selectedRowKeys,
                                        onChange: onSelectChange,
                                        selections: [
                                            {
                                                key: 'all-data',
                                                text: 'Select All Data',
                                                onSelect: () => {
                                                    this.setState({
                                                        selectedRowKeys: [...Array(46).keys()], // 0...45
                                                    });
                                                },
                                            },
                                            {
                                                key: 'odd',
                                                text: 'Select Odd Row',
                                                onSelect: changableRowKeys => {
                                                    let newSelectedRowKeys = [];
                                                    newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                                                        if (index % 2 !== 0) {
                                                            return false;
                                                        }
                                                        return true;
                                                    });
                                                    this.setState({ selectedRowKeys: newSelectedRowKeys });
                                                },
                                            },
                                            {
                                                key: 'even',
                                                text: 'Select Even Row',
                                                onSelect: changableRowKeys => {
                                                    let newSelectedRowKeys = [];
                                                    newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                                                        if (index % 2 !== 0) {
                                                            return true;
                                                        }
                                                        return false;
                                                    });
                                                    this.setState({ selectedRowKeys: newSelectedRowKeys });
                                                },
                                            },
                                        ],
                                    } : null}
                                dataSource={
                                    !isSearching ? isGrouping ? expandedRowData : dataState.length || isFiltering ? dataState : data : dataState
                                }


                            />
                        </div>
                    </div>
                </div>
                <div className="groupByModal">
                    <Modal
                        title="Group By"
                        visible={this.state.modalVisible}
                        onOk={() => this.setModalVisible(false)}
                        onCancel={() => this.setModalVisible(false)}
                        width={300}
                        footer={[
                            <Button
                                type={'link'}
                                onClick={() => this.setModalVisibleAndSave(false)}
                                style={{
                                    fontSize: '16px',
                                    color: '#fff'
                                }}
                            >
                                Ok
                            </Button>,
                            <Button
                                type={'link'}
                                onClick={() => this.setModalVisible(false)}
                                style={{
                                    fontSize: '16px',
                                    color: '#fff'
                                }}
                            >
                                Cancel
                            </Button>

                        ]}
                    >

                        <Radio.Group
                            options={options1}
                            onChange={this.onChangeGroup1}
                            value={this.state.value1}
                        />

                        <Radio.Group
                            options={options2}
                            onChange={this.onChangeGroup2}
                            value={value2}
                        />

                    </Modal>
                </div>
                <div className="cart_modal">
                    <Modal
                        title="Cart"
                        centered
                        visible={cartModalVisible}
                        onOk={() => this.setCartModalVisible(false)}
                        onCancel={() => this.setCartModalVisible(false)}
                    >
                        {dataCart.length ? dataCart.map((item, key) => {
                            costTotal += +item.Price * item.count;

                            return (
                                <div
                                    className='d-flex cart_content justify-content-between p-2 align-items-center'
                                    key={key}>
                                    <p><strong>Pcs: {item.count}</strong></p>
                                    <p className='text-center'>{item.VendorName}</p>
                                    <p className='price text-right'>&euro;{parseFloat(item.Price).toFixed(2)}</p>
                                </div>
                            )
                        }) :
                            <div className='d-flex cart_content justify-content-between p-2 align-items-center'>
                                <p className='price text-center'>No Data</p>
                            </div>
                        }
                        <div className='subTotal text-left p-2 d-flex justify-content-between align-items-center'>
                            <span>Subtotal ({dataCart.length} items)</span>
                            <span className='text-success total'>&euro;{parseFloat(costTotal).toFixed(2)}</span>
                        </div>
                    </Modal>
                </div>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(
    mapStateToProps,
    {}
)(Grid);