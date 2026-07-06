import { ChangeDetectorRef } from '@angular/core';
import { AppGlobalInfo } from '../../app.appglobalinfo';
import { Util } from '../../common/app.utils';
import { ModelConstants } from '../../common/model.constants';
import { Field, FieldOVPreload } from '../../common/baseIUElements';
import { AbstractFilter } from '../../common/abstractFilter';
import { StandardFunctions } from '../../common/standardFunctions';
import { LanguageMng } from '../../common/languageMng';

/**
 * « Manages the filter F_UsuariosPolizaInter of class Usuario »
 */
export class UsuarioFilterFuUsuariosPolizaInter extends AbstractFilter {

    /** Filter variables */
    public vfDesde: Field;
    public vfHasta: Field;
    public vfTipoDoc: FieldOVPreload;
    public vfNumIdent: Field;

    /**
     * Component constructor
     * @param appGlobalInfo Application Global Information
     * @param util Navigation utils
     * @param changeDetectorRef Angular module
     * @param langMng Language manager
     * @param stdFun Standard functions
     */
    constructor(public override appGlobalInfo: AppGlobalInfo,
                public override util: Util,
                public override changeDetectorRef: ChangeDetectorRef,
                public langMng: LanguageMng,
                public stdFun: StandardFunctions) {
        super(appGlobalInfo, util, changeDetectorRef);
        this.title = this.langMng.translateText('cls_Usuario_filter_F_UsuariosPolizaInter',
            'Entre fechas y por documento');
        this.filterName = 'F_UsuariosPolizaInter';

        this.vfDesde = new Field(this.langMng);
        this.vfHasta = new Field(this.langMng);
        this.vfTipoDoc = new FieldOVPreload(this.langMng);
        this.vfNumIdent = new Field(this.langMng);
    }

    /**
     * Initialize the filter
     */
    public override initializeComponents(): void {

        this.vfDesde.nameInRequest = 'vfdesde';
        this.vfDesde.alias = this.langMng.translateText(
            'cls_Usuario_filter_F_UsuariosPolizaInter_fvar_vfDesde',
            'Desde');
        this.vfDesde.visible = true;
        this.vfDesde.enabled = true;
        this.vfDesde.mandatory = false;
        this.vfDesde.dataType = Field.dtDate;
        this.vfDesde.assignCSS(this.populationContainer !== undefined);
        this.variables.push(this.vfDesde);

        this.vfHasta.nameInRequest = 'vfhasta';
        this.vfHasta.alias = this.langMng.translateText(
            'cls_Usuario_filter_F_UsuariosPolizaInter_fvar_vfHasta',
            'Hasta');
        this.vfHasta.visible = true;
        this.vfHasta.enabled = true;
        this.vfHasta.mandatory = false;
        this.vfHasta.dataType = Field.dtDate;
        this.vfHasta.assignCSS(this.populationContainer !== undefined);
        this.variables.push(this.vfHasta);

        this.vfTipoDoc.nameInRequest = 'vftipodoc';
        this.vfTipoDoc.alias = this.langMng.translateText(
            'cls_Usuario_filter_F_UsuariosPolizaInter_fvar_vfTipoDoc',
            'Tipo Documento');
        this.vfTipoDoc.visible = true;
        this.vfTipoDoc.enabled = true;
        this.vfTipoDoc.mandatory = false;
        this.vfTipoDoc.dataType = ModelConstants.Tipoidentificacion.name;
        this.vfTipoDoc.preloadValues = [];
        this.vfTipoDoc.allowMultiSelect = false;
        this.vfTipoDoc.maxLength = 170;
        this.vfTipoDoc.assignCSS(this.populationContainer !== undefined);
        this.variables.push(this.vfTipoDoc);

        this.vfNumIdent.nameInRequest = 'vfnumident';
        this.vfNumIdent.alias = this.langMng.translateText(
            'cls_Usuario_filter_F_UsuariosPolizaInter_fvar_vfNumIdent',
            'Nº Identificación');
        this.vfNumIdent.visible = true;
        this.vfNumIdent.enabled = true;
        this.vfNumIdent.mandatory = false;
        this.vfNumIdent.dataType = Field.dtString;
        this.vfNumIdent.maxLength = 20;
        this.vfNumIdent.assignCSS(this.populationContainer !== undefined);
        this.variables.push(this.vfNumIdent);
    }

    public override loadPreload(): void {

        // vfTipoDoc
        this.executeSearchPreload(this.vfTipoDoc, ModelConstants.Tipoidentificacion.name, 'IC_TipoIdentificacion',
            'OC_TipoIdentificacion', []);
    }

}
