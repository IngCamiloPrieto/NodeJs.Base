import { instance, mock, verify, when } from 'ts-mockito';
import UnitBL from '../../src/business/bl/unit/unitBL';
import {UnitDALAction} from '../../src/interfaces/contracts/unit/unitDALAction';
import { MockUnit } from './Mock/Entities';
import { expect } from 'chai';
const config = require('../config.json');
const TestConfig = config.testing;

export class UnitTestBl {


    public startTest = () => {

    describe('UnitBLTest', () => {
        let unitBL:UnitBL;
        let unitDAL:UnitDALAction;
        let mockUnitData : MockUnit[];
        let mockUnit : MockUnit;
        let mockUnitProcessed : MockUnit;
    
        beforeEach(() => {
            unitDAL = mock<UnitDALAction>();
            unitBL = new UnitBL(TestConfig.bdconfig_cnxstring);  
            mockUnitData = [new MockUnit(),new MockUnit(),new MockUnit()];
            mockUnit = new MockUnit('b1c4a89e-4905-5e3c-b57f-dc92627d011e');
            mockUnitProcessed = new MockUnit('b1c4a89e-4905-5e3c-b57f-dc92627d011e');
            mockUnitProcessed['processed']=true;
        });
    
        describe('Find All Units Test',() => {            
                it('Getting a list of units', async () => {
                    // given                    
                    when(await unitDAL.findAll("")).thenReturn(mockUnitData);    
                    // when
                    let response = await unitBL.findAll("");                        
                    // then
                    verify(unitDAL.findAll("")).called();
                    expect(response.statuscode).equals(200);
                    expect(response.count).equals(3)
                });         
        });
        describe('Find One Unit Test',() => {            
            it('Getting existing unit', async () => {
                // given                    
                when(await unitDAL.findUnit("b1c4a89e-4905-5e3c-b57f-dc92627d011e")).thenReturn(mockUnit);    
                // when
                let response = await unitBL.findUnit("b1c4a89e-4905-5e3c-b57f-dc92627d011e");                        
                // then
                verify(unitDAL.findUnit("b1c4a89e-4905-5e3c-b57f-dc92627d011e")).called();
                expect(response.statuscode).equals(200);
                expect(response.count).equals(1);
                expect(response.data[0].unit_id).equals("b1c4a89e-4905-5e3c-b57f-dc92627d011e");
            });         
        });
        describe('Find One Unit Test',() => {            
            it('Getting non existing unit', async () => {
                // when
                when(await unitDAL.findUnit("b1c4a89e-4905-5e3c-b57f-dc92627d011e")).thenReturn(null); 
                let response = await unitBL.findUnit("b1c4a89e-4905-5e3c-b57f-dc92627d011e");                        
                // then
                verify(unitDAL.findUnit("b1c4a89e-4905-5e3c-b57f-dc92627d011e")).called();
                expect(response.statuscode).equals(200);
                expect(response.count).equals(0);
            });         
        });
        describe('Add Unit Test',() => {            
            it('Add new unit', async () => {
                // given     
                when(await unitDAL.addUnit(mockUnit)).thenReturn(mockUnit);    
                // when
                let response = await unitBL.addUnit(mockUnit);                        
                // then
                verify(unitDAL.addUnit(mockUnit)).called();
                expect(response.statuscode).equals(201);
                expect(response.count).equals(1);
                expect(response.data[0].unit_id).equals("b1c4a89e-4905-5e3c-b57f-dc92627d011e");
            });   
        });
        describe('Add Unit Test',() => {            
            it('Add existing unit', async () => {
                // given     
                when(await unitDAL.findUnit("b1c4a89e-4905-5e3c-b57f-dc92627d011e")).thenReturn(mockUnit);                   
                when(await unitDAL.addUnit(mockUnit)).thenReturn(mockUnit);    
                // when
                // then
                try{
                    let response = await unitBL.addUnit(mockUnit);                       
                }catch (e){
                    expect(e.code).equals(400);
                }
            });   
        });
        describe('Update Unit Test',() => {            
            it('Update existing unit', async () => {
                // given                    
                when(await unitDAL.findUnit("b1c4a89e-4905-5e3c-b57f-dc92627d011e")).thenReturn(mockUnit);                   
                when(await unitDAL.updateUnit(mockUnit)).thenReturn(mockUnit);    
                // when
                let response = await unitBL.updateUnit(mockUnit);                        
                // then
                verify(unitDAL.updateUnit(mockUnit)).called();
                expect(response.statuscode).equals(200);
                expect(response.count).equals(1);
                expect(response.data[0].unit_id).equals("b1c4a89e-4905-5e3c-b57f-dc92627d011e");
            });   
        });
        describe('Update Unit Test',() => {            
            it('Update non existing unit', async () => {
                // given                    
                when(await unitDAL.updateUnit(mockUnit)).thenReturn(mockUnit);    
                // when
                try{
                    let response = await unitBL.updateUnit(mockUnit);                        
                }catch (e){
                    expect(e.code).equals(400);
                }
            });   
        });
        describe('Delete Unit Test',() => {            
            it('Delete existing unit', async () => {
                // given                    
                when(await unitDAL.findUnit("b1c4a89e-4905-5e3c-b57f-dc92627d011e")).thenReturn(mockUnit);                   
                when(await unitDAL.deleteUnit(mockUnit)).thenReturn(mockUnit);    
                // when
                let response = await unitBL.deleteUnit(mockUnit);                        
                // then
                verify(unitDAL.deleteUnit(mockUnit)).called();
                expect(response.statuscode).equals(202);
                expect(response.count).equals(1);
                expect(response.data[0].unit_id).equals("b1c4a89e-4905-5e3c-b57f-dc92627d011e");
            });   
        });
        describe('Delete Unit Test',() => {            
            it('Delete non existing unit', async () => {
                // given                    
                when(await unitDAL.deleteUnit(mockUnit)).thenReturn(mockUnit);    
                // when
                try{
                    let response = await unitBL.deleteUnit(mockUnit);                        
                }catch (e){
                    expect(e.code).equals(400);
                }
            });   
        });

        describe('syncUnit Units Test',() => {            
            it('Sync units', async () => {
                // given                    
                when(await unitDAL.syncUnit(mockUnit)).thenReturn(mockUnitProcessed);    
                // when
                let response = await unitBL.syncUnit([mockUnit]);                        
                verify(unitDAL.syncUnit(mockUnit)).called();
                expect(response.statuscode).equals(201);
                expect(response.count).equals(1);
                expect(response.data[0].unit_id).equals("b1c4a89e-4905-5e3c-b57f-dc92627d011e");
                expect(response.data[0]['processed']).equals(true);
            });   
        });

    });  
}; 
}