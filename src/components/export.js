import React from "react";
import ReactExport from "react-export-excel";
import {Button} from "antd";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;


function getting() {
    let buttonDiv = document.getElementById('forExportButton');
    buttonDiv.children[0].children[0].click();
}

function ExportExcel({data}) {

    return (
        <div>
            <div id={'forExportButton'} style={{display: 'none'}}>
                <ExcelFile>
                    {data.length &&
                    <ExcelSheet data={data} name="data">
                        <ExcelColumn label={'VendorName'} value={'VendorName'}/>
                        <ExcelColumn label={'Article'} value={'Article'}/>
                        <ExcelColumn label={'MaterialGroupText'} value={'MaterialGroupText'}/>
                        <ExcelColumn label={'IngredientDescription'} value={'IngredientDescription'}/>
                        <ExcelColumn label={'OrderUnit'} value={'OrderUnit'}/>
                        <ExcelColumn label={'OrderDate'} value={'OrderDate'}/>
                        <ExcelColumn label={'Price'} value={'Price'}/>
                    </ExcelSheet>
                    }

                </ExcelFile>

            </div>
            <Button type="primary" icon="export" onClick={()=>getting()} className='m-2' />


        </div>
    );
}


export default ExportExcel;