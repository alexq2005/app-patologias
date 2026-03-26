// ============================================================
// Scale category images — maps each scale category to a clinical photo
// ============================================================

import type { ImageSourcePropType } from 'react-native';

const SCALE_CATEGORY_IMAGES: Record<string, ImageSourcePropType> = {
  neurologia:       require('../assets/images/conditions/brain_ct.jpg'),
  neonatologia:     require('../assets/images/conditions/heart_monitor.jpg'),
  riesgo_ulceras:   require('../assets/images/conditions/bandage.jpg'),
  sepsis:           require('../assets/images/conditions/iv_drip.jpg'),
  postanestesia:    require('../assets/images/conditions/surgery.jpg'),
  sedacion:         require('../assets/images/conditions/heart_monitor.jpg'),
  dolor:            require('../assets/images/conditions/ecg.jpg'),
  via_aerea:        require('../assets/images/conditions/chest_xray.jpg'),
  asa:              require('../assets/images/conditions/surgery.jpg'),
  trombosis:        require('../assets/images/conditions/blood_pressure.jpg'),
  caidas:           require('../assets/images/conditions/bones_xray.jpg'),
  funcional:        require('../assets/images/conditions/kidney.jpg'),
  dolor_pediatrico: require('../assets/images/conditions/heart_monitor.jpg'),
  nutricion:        require('../assets/images/conditions/glucose.jpg'),
};

const FALLBACK = require('../assets/images/conditions/ecg.jpg');

export function getScaleImage(category: string): ImageSourcePropType {
  return SCALE_CATEGORY_IMAGES[category] ?? FALLBACK;
}
