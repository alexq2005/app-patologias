// ============================================================
// Condition Images — maps each pathology to a clinical image
// Falls back to body system image if no specific match
// ============================================================

import type { ImageSourcePropType } from 'react-native';
import { getSystemImage } from './systemImages';
import type { BodySystemId } from '../types';

// ── Condition type images ───────────────────────────────────

type ConditionType =
  | 'blood_pressure' | 'heart_monitor' | 'ecg' | 'chest_xray'
  | 'inhaler' | 'brain_ct' | 'neuron' | 'glucose' | 'liver'
  | 'stomach' | 'kidney' | 'bones_xray' | 'joints' | 'blood_test'
  | 'microscope' | 'virus' | 'pregnancy' | 'surgery' | 'iv_drip'
  | 'pills' | 'stethoscope' | 'bandage' | 'cancer_cells';

// Images available on disk — missing ones remap to closest match
const IMG_BLOOD_PRESSURE = require('../assets/images/conditions/blood_pressure.jpg');
const IMG_HEART_MONITOR  = require('../assets/images/conditions/heart_monitor.jpg');
const IMG_ECG            = require('../assets/images/conditions/ecg.jpg');
const IMG_CHEST_XRAY     = require('../assets/images/conditions/chest_xray.jpg');
const IMG_BRAIN_CT       = require('../assets/images/conditions/brain_ct.jpg');
const IMG_GLUCOSE        = require('../assets/images/conditions/glucose.jpg');
const IMG_KIDNEY         = require('../assets/images/conditions/kidney.jpg');
const IMG_BONES_XRAY     = require('../assets/images/conditions/bones_xray.jpg');
const IMG_VIRUS          = require('../assets/images/conditions/virus.jpg');
const IMG_PREGNANCY      = require('../assets/images/conditions/heart_monitor.jpg');
const IMG_SURGERY        = require('../assets/images/conditions/surgery.jpg');
const IMG_IV_DRIP        = require('../assets/images/conditions/iv_drip.jpg');
const IMG_BANDAGE        = require('../assets/images/conditions/bandage.jpg');

const CONDITION_IMAGES: Record<ConditionType, ImageSourcePropType> = {
  blood_pressure: IMG_BLOOD_PRESSURE,
  heart_monitor:  IMG_HEART_MONITOR,
  ecg:            IMG_ECG,
  chest_xray:     IMG_CHEST_XRAY,
  inhaler:        IMG_CHEST_XRAY,     // remap: no inhaler image
  brain_ct:       IMG_BRAIN_CT,
  neuron:         IMG_BRAIN_CT,        // remap: no neuron image
  glucose:        IMG_GLUCOSE,
  liver:          IMG_KIDNEY,          // remap: no liver image
  stomach:        IMG_KIDNEY,          // remap: no stomach image
  kidney:         IMG_KIDNEY,
  bones_xray:     IMG_BONES_XRAY,
  joints:         IMG_BONES_XRAY,     // remap: no joints image
  blood_test:     IMG_HEART_MONITOR,  // remap: no blood_test image
  microscope:     IMG_VIRUS,          // remap: no microscope image
  virus:          IMG_VIRUS,
  pregnancy:      IMG_PREGNANCY,
  surgery:        IMG_SURGERY,
  iv_drip:        IMG_IV_DRIP,
  pills:          IMG_IV_DRIP,        // remap: no pills image
  stethoscope:    IMG_HEART_MONITOR,  // remap: no stethoscope image
  bandage:        IMG_BANDAGE,
  cancer_cells:   IMG_VIRUS,          // remap: no cancer_cells image
};

// ── Pathology → Condition mapping ───────────────────────────

const PATHOLOGY_CONDITION: Record<string, ConditionType> = {
  // Cardiovascular
  pat_hta: 'blood_pressure',
  pat_icc: 'heart_monitor',
  pat_iam: 'ecg',
  pat_angina: 'ecg',
  pat_fa: 'ecg',
  pat_tvp: 'iv_drip',
  pat_eap: 'chest_xray',
  pat_endocarditis: 'heart_monitor',
  pat_pericarditis: 'heart_monitor',
  pat_shock_cardiogenico: 'heart_monitor',
  pat_valvulopatia: 'stethoscope',
  pat_miocardiopatia: 'heart_monitor',
  pat_arteriopatia_periferica: 'blood_pressure',
  pat_shock_hipovolemico: 'iv_drip',
  pat_tamponamiento_cardiaco: 'heart_monitor',
  pat_aneurisma_aorta: 'surgery',

  // Respiratorio
  pat_epoc: 'chest_xray',
  pat_asma: 'inhaler',
  pat_neumonia: 'chest_xray',
  pat_tep: 'chest_xray',
  pat_neumotorax: 'chest_xray',
  pat_ira: 'chest_xray',
  pat_tuberculosis: 'chest_xray',
  pat_derrame_pleural: 'chest_xray',
  pat_fibrosis_pulmonar: 'chest_xray',
  pat_sdra: 'heart_monitor',
  pat_bronquiectasias: 'chest_xray',
  pat_cancer_pulmon: 'cancer_cells',
  pat_hemotorax: 'surgery',

  // Neurologico
  pat_acv: 'brain_ct',
  pat_epilepsia: 'neuron',
  pat_meningitis: 'brain_ct',
  pat_parkinson: 'neuron',
  pat_alzheimer: 'neuron',
  pat_guillain_barre: 'neuron',
  pat_esclerosis_lateral: 'neuron',
  pat_miastenia_gravis: 'neuron',
  pat_hipertension_intracraneal: 'brain_ct',
  pat_neuralgia_trigemino: 'neuron',
  pat_hidrocefalia: 'brain_ct',
  pat_neuropatia_periferica: 'neuron',

  // Digestivo
  pat_ulcera_peptica: 'stomach',
  pat_cirrosis: 'liver',
  pat_pancreatitis: 'stomach',
  pat_eii: 'stomach',
  pat_hemorragia_digestiva: 'iv_drip',
  pat_apendicitis: 'surgery',
  pat_obstruccion_intestinal: 'surgery',
  pat_colecistitis: 'liver',
  pat_hepatitis: 'liver',
  pat_diverticulitis: 'stomach',
  pat_reflujo: 'stomach',
  pat_peritonitis: 'surgery',
  pat_celiaquia: 'stomach',

  // Endocrino
  pat_dm1: 'glucose',
  pat_dm2: 'glucose',
  pat_hipotiroidismo: 'pills',
  pat_hipertiroidismo: 'pills',
  pat_cetoacidosis: 'glucose',
  pat_addison: 'pills',
  pat_cushing: 'stethoscope',
  pat_feocromocitoma: 'blood_pressure',
  pat_hipopituitarismo: 'pills',
  pat_hiperparatiroidismo: 'blood_test',
  pat_coma_mixedematoso: 'heart_monitor',
  pat_tormenta_tiroidea: 'heart_monitor',

  // Renal/Urinario
  pat_irc: 'kidney',
  pat_ira_renal: 'kidney',
  pat_itu: 'microscope',
  pat_litiasis: 'kidney',
  pat_sindrome_nefrotico: 'kidney',
  pat_glomerulonefritis: 'kidney',
  pat_pielonefritis: 'kidney',
  pat_vejiga_neurogenica: 'kidney',
  pat_nefropatia_diabetica: 'glucose',
  pat_rabdomiolisis: 'blood_test',
  pat_cistitis: 'microscope',
  pat_necrosis_tubular: 'kidney',
  pat_sindrome_hemolitico_uremico: 'microscope',
  pat_hiperplasia_prostatica: 'stethoscope',

  // Musculoesqueletico
  pat_fractura_cadera: 'bones_xray',
  pat_osteoporosis: 'bones_xray',
  pat_artritis_reumatoide: 'joints',
  pat_hernia_discal: 'bones_xray',
  pat_osteomielitis: 'bones_xray',
  pat_espondilitis: 'bones_xray',
  pat_fibromialgia: 'joints',
  pat_gota: 'joints',
  pat_sarcopenia: 'joints',
  pat_luxacion: 'bones_xray',
  pat_sindrome_compartimental: 'bandage',
  pat_artritis_septica: 'joints',
  pat_distrofia_muscular: 'joints',

  // Hematologico
  pat_anemia_ferropenica: 'blood_test',
  pat_leucemia: 'microscope',
  pat_hemofilia: 'blood_test',
  pat_linfoma: 'cancer_cells',
  pat_cid: 'blood_test',
  pat_purpura_trombocitopenica: 'blood_test',
  pat_talasemia: 'blood_test',
  pat_mieloma: 'cancer_cells',
  pat_policitemia: 'blood_test',
  pat_neutropenia: 'microscope',
  pat_anemia_megaloblastica: 'blood_test',
  pat_aplasia_medular: 'microscope',
  pat_trombofilia: 'blood_test',

  // Inmunologico
  pat_vih: 'virus',
  pat_lupus: 'microscope',
  pat_anafilaxia: 'iv_drip',
  pat_esclerosis_multiple: 'neuron',
  pat_sindrome_sjogren: 'stethoscope',
  pat_artritis_reactiva: 'joints',
  pat_vasculitis: 'microscope',
  pat_sarcoidosis: 'chest_xray',
  pat_inmunodeficiencia_primaria: 'virus',
  pat_rechazo_trasplante: 'pills',
  pat_sepsis: 'iv_drip',
  pat_enfermedad_injerto: 'pills',

  // Tegumentario
  pat_upp: 'bandage',
  pat_celulitis: 'bandage',
  pat_psoriasis: 'stethoscope',
  pat_herpes_zoster: 'virus',
  pat_melanoma: 'cancer_cells',
  pat_dermatitis_atopica: 'stethoscope',
  pat_erisipela: 'bandage',
  pat_pie_diabetico: 'bandage',
  pat_urticaria: 'pills',
  pat_fascitis_necrotizante: 'surgery',
  pat_stevens_johnson: 'iv_drip',

  // Reproductivo
  pat_preeclampsia: 'blood_pressure',
  pat_cancer_mama: 'cancer_cells',
  pat_endometriosis: 'stethoscope',
  pat_ets: 'microscope',
  pat_hpp: 'iv_drip',
  pat_placenta_previa: 'pregnancy',
  pat_embarazo_ectopico: 'surgery',
  pat_cancer_cervix: 'cancer_cells',
  pat_mastitis: 'stethoscope',
  pat_dpp: 'pregnancy',
  pat_mola_hidatiforme: 'pregnancy',
  pat_eclampsia: 'blood_pressure',

  // Traumatologico
  pat_tce: 'brain_ct',
  pat_politraumatismo: 'surgery',
  pat_quemaduras: 'bandage',
  pat_lesion_medular: 'bones_xray',
  pat_trauma_toracico: 'chest_xray',
  pat_trauma_abdominal: 'surgery',
  pat_fracturas_extremidades: 'bones_xray',
  pat_ahogamiento: 'heart_monitor',
  pat_amputacion_traumatica: 'surgery',
  pat_hipotermia: 'heart_monitor',
};

// ── Public API ──────────────────────────────────────────────

export function getConditionImage(
  pathologyId: string,
  bodySystemId: BodySystemId,
): ImageSourcePropType {
  const condType = PATHOLOGY_CONDITION[pathologyId];
  if (condType && CONDITION_IMAGES[condType]) {
    return CONDITION_IMAGES[condType];
  }
  // Fallback to body system image
  return getSystemImage(bodySystemId);
}
