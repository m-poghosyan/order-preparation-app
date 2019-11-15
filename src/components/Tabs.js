import React, {Component} from 'react';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import DevGrid from "./Grid";
import connect from "react-redux/es/connect/connect";
import { loadSites } from '../actions/sites';
import { loadOrderPrep } from "../actions/orderPrep";
import { loadShoppingList } from "../actions/shoppingList";
import { loadTabs } from "../actions/tabs";
import { updateCart, loadCart  } from "../actions/cart";
import { Button, Collapse, InputNumber, Modal, Select, Table } from "antd";


import Typography from "@material-ui/core/Typography";


const { Option } = Select;
const { Panel } = Collapse;


class SimpleTabs extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value: 0,
            sites: [],
            modalVisible: false,
            concept: [],
            selectedRowKeys: [],
            eachCount: 1,
            tabList: [
                {
                    name: 'FromMenuPlanning',
                    title: 'From Menu Planning',
                },
                {
                    name: 'Breakfast',
                    title: 'Breakfast (basic items)',
                },
                {
                    name: 'Dinner',
                    title: 'Dinner',
                },
                {
                    name: 'Lunch',
                    title: 'Lunch',
                },
                {
                    name: 'ShoppingListDalucci',
                    title: 'Shopping List Dalucci',
                },
                {
                    name: 'SPC',
                    title: 'SPC',
                },
                {
                    name: 'ShoppingList',
                    title: 'Shopping List',
                },
            ]
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSelection = this.handleSelection.bind(this);
        this.setModalVisible = this.setModalVisible.bind(this);
        this.itemCountChange = this.itemCountChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.deleteFromCart = this.deleteFromCart.bind(this);
    }


    handleChange(event, newValue) {

        let fakeData = this.shuffle(this.props.orderPrep.orderPrep);

        this.setState({
            value: newValue,
            fakeData
        })

    }

    componentDidMount() {

        this.props.loadOrderPrep();
        this.props.loadSites();
        this.props.loadShoppingList();
        this.props.loadTabs();
        this.props.loadCart();

    }

    setModalVisible(modalVisible, index) {

        const { orderPrep } = this.props;

        this.setState({
            itemConcept: index ? orderPrep.orderPrep[index] : [],
            modalVisible,

        });
    }

    shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    handleSelection(e){
        this.props.loadOrderPrep(e);

        // let {tabs} = this.props;
        // let tb = [];
        //
        // switch (e) {
        //     case '0':
        //         tb = tabs.tabs.slice(0,tabs.tabs.length)
        //         break;
        //     case '1':
        //         tb = tabs.tabs.slice(0,tabs.tabs.length-4)
        //     break;
        //     case '2':
        //         tb = tabs.tabs.slice(0,tabs.tabs.length-2)
        //         break;
        //     case '3':
        //         tb = tabs.tabs.slice(0,tabs.tabs.length-3)
        //         break;
        //     case '4':
        //         tb = tabs.tabs.slice(0,tabs.tabs.length-1)
        //         break;
        // }
        //
        // this.setState({
        //     tabList: tb
        // })

    }

    itemCountChange(val, index) {


        let {selectedRowKeys, eachCount} = this.state;
        let {cart} = this.props;


        if (selectedRowKeys.includes(index)) {
            cart.cart[index].count = val;
            this.props.updateCart(cart.cart);
        } else {
            eachCount = val;
            this.setState({eachCount});
        }


    }

    deleteFromCart(index){

        let {cart} = this.props;
        let {selectedRowKeys} = this.state;

        cart.cart.splice(index, 1);
        selectedRowKeys.splice(index, 1);
        this.props.updateCart(cart.cart);

    }

    onSelectChange(selectedRowKeys, item) {

        let {eachCount} = this.state;
        this.props.updateCart(item);

        if (selectedRowKeys.length) {
            item[selectedRowKeys.length - 1].count = eachCount;
        }

        this.setState({
            selectedRowKeys
        });

    };

    render() {

        const {sites, orderPrep, cart, shoppingList} = this.props;

        const {value, tabList, selectedRowKeys, itemConcept } = this.state;


        cart.cart.length && cart.cart.map((item) => item.count ? item.count : item.count = 1);



        const menuPlanningHeader = [
            {
                title: 'VendorName',
                dataIndex: 'VendorName',
                key: 'VendorName',
            },
            {
                title: 'Article',
                dataIndex: 'Article',
                key: 'Article',

            },
            {
                title: 'Alt.',
                dataIndex: 'Alt.',
                key: 'Alt.',
                render: (text, row, index) => {
                    return (
                        <Button icon="menu" onClick={() => this.setModalVisible(true, index)} />
                    );
                }


            },
            {
                title: 'Proposed Quantity',
                dataIndex: 'ProposedQuantity',
                key: 'ProposedQuantity',
                render: (text, row, index) => {
                    return (
                        <InputNumber min={1} max={10000} defaultValue={1}/>
                    );
                }
            },
            {
                title: 'Material Group Text',
                dataIndex: 'MaterialGroupText',
                key: 'MaterialGroupText',

            },
            {
                title: 'Ingredient Description',
                dataIndex: 'IngredientDescription',
                key: 'IngredientDescription',

            },
            {
                title: 'Order Unit',
                dataIndex: 'OrderUnit',
                key: 'OrderUnit',

            },
            {
                title: 'Order Date',
                dataIndex: 'OrderDate',
                key: 'OrderDate',

            },
            {
                title: 'Unit Price',
                dataIndex: 'Price',
                key: 'Price',

            },
            {
                title: 'Total Price',
                dataIndex: 'TotalPrice',
                key: 'TotalPrice',

            },
        ];

        let costTotal = 0;


        return (
            <div >

                <div className="container">
                    <div className="row p-5">
                        <div className="col">
                            <Select defaultValue="Site Selection" onChange={this.handleSelection}>

                                {sites.sites.map((item, key) => (
                                    <Option key={key} value={item.Site}>{item.SiteName}</Option>
                                ))}

                            </Select>
                        </div>
                        <div className="col">
                            <div className="siteSelect">
                                <div className="card p-0">
                                    <Collapse>
                                        <Panel header="Cart" key="1">
                                        <div className="crtcnt">
                                            {cart.cart.length ? cart.cart.map((item, key) => {
                                                costTotal += +item.Price * item.count;

                                                return (
                                                    <div
                                                        className='d-flex cart_content justify-content-between p-2 align-items-center'
                                                        key={key}>
                                                        <div><InputNumber min={1} max={10000} value={item.count || 1}
                                                                          onChange={(e) => this.itemCountChange(e, key)}
                                                                          style={{width: '60px'}}/></div>
                                                        <p>{item.VendorName}</p>
                                                        <p className={'price'}>&euro;{parseFloat(item.Price).toFixed(2)}</p>
                                                        <p style={{fontSize: '20px', cursor: 'pointer'}}
                                                           onClick={() => this.deleteFromCart(key)}><i
                                                            className={'fa fa-trash'}></i></p>
                                                    </div>
                                                )
                                            }):
                                            <div className='d-flex cart_content justify-content-center p-2 align-items-center'>
                                                <p className='price text-center'>No Data</p>
                                            </div>}

                                        </div>
                                            <div
                                                className='subTotal text-left p-2 d-flex justify-content-between align-items-center'>
                                                <span>Subtotal ({cart.cart.length} items)</span>
                                                <span
                                                    className='text-success total'>&euro;{parseFloat(costTotal).toFixed(2)}</span>
                                            </div>
                                            <button className='btn checkout_btn' onClick={() => this.setCartModalVisible(true)}
                                                    style={{background: '#eff4f9', width: '100%', color: '#777'}}>Checkout
                                            </button>
                                        </Panel>
                                    </Collapse>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <AppBar position="static" style={{background: '#eff4f9', color: '#333'}}>
                    <Tabs value={value} onChange={this.handleChange}>
                        {tabList.map((item,key) => (
                            <Tab
                                key={key}
                                label={item.title}
                            />
                        ))}
                        <Tab
                            key={tabList.length-1}
                            label={'Shopping Basket'}
                            style={{color: 'orange'}}
                        />
                    </Tabs>
                </AppBar>
                {tabList.map((item, key) => (
                        key === value &&
                        <Typography key={key} component="div" style={{padding: 8 * 3}}>
                            <DevGrid
                                header={menuPlanningHeader}
                                data={orderPrep.orderPrep}
                                onSelectChange={this.onSelectChange}
                                itemCountChange ={this.itemCountChange}
                                setModal={this.setModalVisible}
                                isDate={!value}
                                selectedRowKeys={selectedRowKeys}
                            />
                        </Typography>
                    ))}
                {
                    value === tabList.length &&
                    <Typography key={tabList.length+1} component="div" style={{padding: 8 * 3}}>
                        <DevGrid
                            header={menuPlanningHeader}
                            data={cart.cart}
                            setModal={this.setModalVisible}
                            isDate={false}
                        />
                    </Typography>
                }
                <Modal
                    title="Menu Details"
                    centered
                    visible={this.state.modalVisible}
                    onOk={() => this.setModalVisible(false)}
                    onCancel={() => this.setModalVisible(false)}
                    width={1100}
                    footer={[
                        <Button
                            type={'link'}
                            onClick={() => this.setModalVisible(false)}
                            style={{
                                fontSize: '16px',
                                color: '#fff'
                            }}
                        >
                            Close
                        </Button>
                    ]}
                >
                    <Table
                        pagination={false}
                        columns={[
                            {
                                title: 'Concept ID',
                                dataIndex: 'Concept',
                                key: 'Concept',
                            },
                            {
                                title: 'Concept Name',
                                dataIndex: 'ConceptText',
                                key: 'ConceptText',
                            },
                            {
                                title: 'Menu ID',
                                dataIndex: 'MenuId',
                                key: 'MenuId',
                            },
                            {
                                title: 'Menu Plan Date',
                                dataIndex: 'MenuPlanDate',
                                key: 'MenuPlanDate',
                            },
                            {
                                title: 'Recipe Name',
                                dataIndex: 'RecipeName',
                                key: 'RecipeName',
                            },
                            {
                                title: 'Recipe Quantity',
                                dataIndex: 'RecipeQuantity',
                                key: 'RecipeQuantity',
                            },
                            {
                                title: 'Ingredient Name',
                                dataIndex: 'IngredientDescription',
                                key: 'IngredientDescription',
                            },
                            {
                                title: 'Ingredient Quantity',
                                dataIndex: 'IngredientQuantity',
                                key: 'IngredientQuantity',
                            },
                        ]}
                        dataSource={[itemConcept]}
                    />
                </Modal>
            </div>
        );
    }

}


function mapStateToProps(state) {
    return state;
}

const mapDispatchToProps = {
    loadSites,
    loadOrderPrep,
    loadShoppingList,
    loadTabs,
    updateCart,
    loadCart

};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SimpleTabs);

