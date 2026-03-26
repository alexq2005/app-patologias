// ============================================================
// Scale category images — maps each scale category to a clinical photo
// ============================================================

import type { ImageSourcePropType } from 'react-native';

const SCALE_CATEGORY_IMAGES: Record<string, ImageSourcePropType> = {
  neurologia:       require('../assets/images/conditions/brain_ct.jpg'),
  neonatologia:     require('../assets/images/scales/newborn_baby.jpg'),
  riesgo_ulceras:   require('../assets/images/conditions/bandage.jpg'),
  sepsis:           require('../assets/images/conditions/iv_drip.jpg'),
  postanestesia:    require('../assets/images/conditions/surgery.jpg'),
  sedacion:         require('../assets/images/scales/sedation_icu.jpg'),
  dolor:            require('../assets/images/scales/pain_scale.jpg'),
  via_aerea:        require('../assets/images/scales/open_mouth.jpg'),
  asa:              require('../assets/images/conditions/surgery.jpg'),
  trombosis:        require('../assets/images/scales/blood_clot.jpg'),
  caidas:           require('../assets/images/scales/fall_risk.jpg'),
  funcional:        require('../assets/images/scales/elderly_walking.jpg'),
  dolor_pediatrico: require('../assets/images/scales/baby_crying.jpg'),
  nutricion:        require('../assets/images/scales/nutrition_food.jpg'),
};

const FALLBACK = require('../assets/images/conditions/ecg.jpg');

export function getScaleImage(category: string): ImageSourcePropType {
  return SCALE_CATEGORY_IMAGES[category] ?? FALLBACK;
}
