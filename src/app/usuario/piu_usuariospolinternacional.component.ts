import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { AppGlobalInfo } from '../app.appglobalinfo';
import { Util } from '../common/app.utils';
import { DisplaySetItem } from '../common/queryIUElements';
import { ModelConstants } from '../common/model.constants';
import { AbstractPIU } from '../common/abstractPIU';
import { UsuarioFilterFuUsuariosPolizaInter} from './filters/usuariofilterfuusuariospolizainter';
import { DefinedSelections } from '../common/definedSelection';
import { Field } from '../common/baseIUElements';
import { LanguageMng } from '../common/languageMng';
import { StandardFunctions } from '../common/standardFunctions';
import { ConditionalNavigationMng } from '../common/conditionalNavigationMng';

/**
 * « Implements PIU PIU_UsuariosPolInternacional of Usuario »
 */
@Component({
    selector: 'imes-usuario-piu-usuariospolinternacional',
    templateUrl: './piu_usuariospolinternacional.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsuarioPIUuUsuariosPolInternacionalComponent extends AbstractPIU implements OnInit {
    /** Constants for display set item aliases */
    private readonly dssolicituddaeusolicitudesdproductotddescripcion = 'Producto';
    private readonly dssolicituddaeusolicitudesdplantdnombre = 'Plan';
    private readonly dssolicituddaeusolicitudesdnumerousolicitud = 'Nº Solicitud';
    private readonly dssolicituddcontratocdnumcontrato = 'Nº Contrato';
    private readonly dssolicituddestado = 'Estado Solicitud';
    private readonly dsdrvidentificacion = 'Tipo y Nº Doc';
    private readonly dsdrvnombrecompleto = 'Nombre completo';

    /** Filters */
    public f0: UsuarioFilterFuUsuariosPolizaInter;

    /**
     * Component constructor
     * @param appGlobalInfo Application Global Information
     * @param util Navigation utils
     * @param changeDetectorRef Angular module
     * @param langMng Language manager
     * @param stdFun Standard functions
     * @param condNavMng Conditional manager
     */
    constructor(
        public override appGlobalInfo: AppGlobalInfo, public override util: Util, public override changeDetectorRef: ChangeDetectorRef,
        public override langMng: LanguageMng, public stdFun: StandardFunctions,
        public override condNavMng: ConditionalNavigationMng) {
        super(appGlobalInfo, util, changeDetectorRef, langMng, condNavMng);
        this.idXML = 'Clas_1432633737216826UIPobCl_3';
        this.className = ModelConstants.Usuario.name;
        this.iuName = ModelConstants.Usuario.piuuusuariospolinternacional;
        this.setUserVisibility(this.appGlobalInfo.getLoggedUserInfo().isIUVisible(this.idXML, ['Admin', 'SuperAdmin', 'Asesor']));
        this.title = this.langMng.translateText('cls_Usuario_piu_PIU_UsuariosPolInternacional',
            'Usuarios Respaldo global');
        this.f0 = new UsuarioFilterFuUsuariosPolizaInter(this.appGlobalInfo,
            this.util, this.changeDetectorRef, this.langMng, stdFun);
        this.f0.populationContainer = this;
        this.filters.push(this.f0);
        this.queryURL = '/api/UsuarioApi/GetPopulationDynamic';
        this.paginationInClient = false;
    }

    /**
     * It is the main component. Process the initial actions
     */
    public ngOnInit(): void {
        this.myngOnInit();
    }

    /**
     * Initialize the display set elements
     */
    public override initializeDisplaySet(): void {
        let dsItem: DisplaySetItem;

        dsItem = new DisplaySetItem();
        dsItem.idXML = 'Clas_1432633737216826CjtoVis_4ICtjoVis_1';
        dsItem.name = 'solicitud.ae_solicitudes.productot.descripcion';
        dsItem.field = 'solicitud-ae_solicitudes-productot-descripcion';
        dsItem.type = Field.dtString;
        dsItem.maxLength = 100;
        dsItem.alias = this.langMng.translateText(
            'cls_Usuario_ds_DS_UsuarioPolizaInter_item_Clas_1432633737216826CjtoVis_4ICtjoVis_1',
            this.dssolicituddaeusolicitudesdproductotddescripcion);
        dsItem.agents = [ModelConstants.Admin.name, ModelConstants.Superadmin.name, ModelConstants.Asesor.name];
        this.displaySet.push(dsItem);

        dsItem = new DisplaySetItem();
        dsItem.idXML = 'Clas_1432633737216826CjtoVis_4ICtjoVis_2';
        dsItem.name = 'solicitud.ae_solicitudes.plant.nombre';
        dsItem.field = 'solicitud-ae_solicitudes-plant-nombre';
        dsItem.type = Field.dtString;
        dsItem.maxLength = 150;
        dsItem.alias = this.langMng.translateText(
            'cls_Usuario_ds_DS_UsuarioPolizaInter_item_Clas_1432633737216826CjtoVis_4ICtjoVis_2',
            this.dssolicituddaeusolicitudesdplantdnombre);
        dsItem.agents = [ModelConstants.Admin.name, ModelConstants.Superadmin.name, ModelConstants.Asesor.name];
        this.displaySet.push(dsItem);

        dsItem = new DisplaySetItem();
        dsItem.idXML = 'Clas_1432633737216826CjtoVis_4ICtjoVis_3';
        dsItem.name = 'solicitud.ae_solicitudes.numero_solicitud';
        dsItem.field = 'solicitud-ae_solicitudes-numero_solicitud';
        dsItem.type = Field.dtString;
        dsItem.maxLength = 50;
        dsItem.alias = this.langMng.translateText(
            'cls_Usuario_ds_DS_UsuarioPolizaInter_item_Clas_1432633737216826CjtoVis_4ICtjoVis_3',
            this.dssolicituddaeusolicitudesdnumerousolicitud);
        dsItem.agents = [ModelConstants.Admin.name, ModelConstants.Superadmin.name, ModelConstants.Asesor.name];
        this.displaySet.push(dsItem);

        dsItem = new DisplaySetItem();
        dsItem.idXML = 'Clas_1432633737216826CjtoVis_4ICtjoVis_4';
        dsItem.name = 'solicitud.contratoc.numcontrato';
        dsItem.field = 'solicitud-contratoc-numcontrato';
        dsItem.type = Field.dtString;
        dsItem.maxLength = 50;
        dsItem.alias = this.langMng.translateText(
            'cls_Usuario_ds_DS_UsuarioPolizaInter_item_Clas_1432633737216826CjtoVis_4ICtjoVis_4',
            this.dssolicituddcontratocdnumcontrato);
        dsItem.agents = [ModelConstants.Admin.name, ModelConstants.Superadmin.name, ModelConstants.Asesor.name];
        this.displaySet.push(dsItem);

        dsItem = new DisplaySetItem();
        dsItem.idXML = 'Clas_1432633737216826CjtoVis_4ICtjoVis_7';
        dsItem.name = 'solicitud.estado';
        dsItem.field = 'solicitud-estado';
        dsItem.type = Field.dtInt;
        dsItem.alias = this.langMng.translateText(
            'cls_Usuario_ds_DS_UsuarioPolizaInter_item_Clas_1432633737216826CjtoVis_4ICtjoVis_7',
            this.dssolicituddestado);
        dsItem.agents = [ModelConstants.Admin.name, ModelConstants.Superadmin.name, ModelConstants.Asesor.name];
        dsItem.options = DefinedSelections.DS_ESTADOSOLICITUD;
        this.displaySet.push(dsItem);

        dsItem = new DisplaySetItem();
        dsItem.idXML = 'Clas_1432633737216826CjtoVis_4ICtjoVis_5';
        dsItem.name = 'drvidentificacion';
        dsItem.field = 'drvidentificacion';
        dsItem.type = Field.dtString;
        dsItem.maxLength = 100;
        dsItem.alias = this.langMng.translateText(
            'cls_Usuario_ds_DS_UsuarioPolizaInter_item_Clas_1432633737216826CjtoVis_4ICtjoVis_5',
            this.dsdrvidentificacion);
        dsItem.agents = [ModelConstants.Admin.name, ModelConstants.Superadmin.name, ModelConstants.Asesor.name];
        this.displaySet.push(dsItem);

        dsItem = new DisplaySetItem();
        dsItem.idXML = 'Clas_1432633737216826CjtoVis_4ICtjoVis_6';
        dsItem.name = 'drvnombrecompleto';
        dsItem.field = 'drvnombrecompleto';
        dsItem.type = Field.dtString;
        dsItem.maxLength = 200;
        dsItem.alias = this.langMng.translateText(
            'cls_Usuario_ds_DS_UsuarioPolizaInter_item_Clas_1432633737216826CjtoVis_4ICtjoVis_6',
            this.dsdrvnombrecompleto);
        dsItem.agents = [ModelConstants.Admin.name, ModelConstants.Superadmin.name, ModelConstants.Asesor.name];
        this.displaySet.push(dsItem);
    }

    /**
     * Initialize the order criterias
     */
    public override initializeOrderCriterias(): void {
        this.orderCriteria = '';
    }
}
