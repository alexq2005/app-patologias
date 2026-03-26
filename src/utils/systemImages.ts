// ============================================================
// System Images — maps BodySystemId to bundled photo assets
// ============================================================

import type { BodySystemId } from '../types';
import type { ImageSourcePropType } from 'react-native';

const SYSTEM_IMAGES: Record<BodySystemId, ImageSourcePropType> = {
  cardiovascular:     require('../assets/images/systems/cardiovascular.jpg'),
  respiratorio:       require('../assets/images/systems/respiratorio.jpg'),
  neurologico:        require('../assets/images/systems/neurologico.jpg'),
  digestivo:          require('../assets/images/systems/digestivo.jpg'),
  endocrino:          require('../assets/images/systems/endocrino.jpg'),
  renal_urinario:     require('../assets/images/systems/renal_urinario.jpg'),
  musculoesqueletico: require('../assets/images/systems/musculoesqueletico.jpg'),
  hematologico:       require('../assets/images/systems/hematologico.jpg'),
  inmunologico:       require('../assets/images/systems/inmunologico.jpg'),
  tegumentario:       require('../assets/images/systems/tegumentario.jpg'),
  reproductivo:       require('../assets/images/systems/reproductivo.jpg'),
  traumatologico:     require('../assets/images/systems/traumatologico.jpg'),
};

export function getSystemImage(systemId: BodySystemId): ImageSourcePropType {
  return SYSTEM_IMAGES[systemId];
}
