import json

new_pathologies = [
  # ===== RESPIRATORIO =====
  {
    "id": "pat_derrame_pleural",
    "nombre": "Derrame Pleural",
    "bodySystemId": "respiratorio",
    "definicion": "Acumulacion anormal de liquido en el espacio pleural, por desequilibrio entre la produccion y el drenaje del liquido pleural normal. Puede ser trasudado o exudado segun los criterios de Light.",
    "epidemiologia": "Prevalencia de 320 casos por 100.000 habitantes/anio. Causas mas frecuentes: IC (trasudado), neumonia bacteriana (exudado parapneumonico), cancer (exudado maligno) y tuberculosis.",
    "factoresRiesgo": ["Insuficiencia cardiaca congestiva", "Cirrosis hepatica", "Sindrome nefrotico", "Neumonia bacteriana", "Neoplasias malignas", "Tuberculosis", "Embolia pulmonar", "Artritis reumatoide y LES", "Cirugia toracica o abdominal reciente"],
    "fisiopatologia": "El liquido pleural normal (10-20 mL) se forma en la pleura parietal y se reabsorbe por los linfaticos. En el trasudado el desequilibrio se debe a aumento de presion hidrostatica o reduccion de presion oncotica (IC, cirrosis, sindrome nefrotico). En el exudado hay inflamacion pleural con aumento de permeabilidad vascular (neumonia, TB, cancer). El liquido acumulado comprime el pulmon reduciendo la capacidad vital.",
    "signosYSintomas": {
      "signos": ["Disminucion del murmullo vesicular en base afectada", "Matidez a la percusion en area del derrame", "Abolicion del fremitovorboxilico", "Egofonia por encima del derrame", "Desviacion traqueal al lado contrario si es masivo", "Disminucion de la expansion toracica ipsilateral"],
      "sintomas": ["Disnea proporcional al tamano del derrame", "Tos seca e irritativa", "Dolor pleuritico (agudo, en puntada) en derrames inflamatorios", "Ortopnea si bilateral", "Sintomas de la enfermedad subyacente: fiebre en neumonia, adelgazamiento en cancer"]
    },
    "clasificacion": {
      "nombre": "Clasificacion por criterios de Light (exudado vs trasudado)",
      "tipos": [
        {"nombre": "Trasudado", "descripcion": "Proteinas LP/S < 0.5; LDH LP/S < 0.6; LDH LP < 2/3 del limite superior normal. Causas: IC, cirrosis, nefrotico"},
        {"nombre": "Exudado", "descripcion": "Al menos 1 criterio de Light positivo. Causas: neumonia, TB, cancer, embolia"},
        {"nombre": "Empiema pleural", "descripcion": "Exudado purulento con bacterias; pH < 7.2; glucosa < 40 mg/dL"},
        {"nombre": "Hemotorax", "descripcion": "Hematocrito del liquido pleural > 50% del sanguineo; causa traumatica o iatrogena"},
        {"nombre": "Quilotorax", "descripcion": "Trigliceridos > 110 mg/dL en liquido pleural; causa: trauma linfatico o linfoma"}
      ]
    },
    "diagnostico": {
      "anamnesis": ["Inicio y progresion de la disnea", "Antecedente de IC, cirrosis, neoplasia, TB", "Fiebre y sintomas infecciosos (neumonia)", "Adelgazamiento no intencionado (neoplasia)", "Trauma toracico reciente"],
      "examenFisico": ["Percusion: matidez desplazable segun posicion", "Auscultacion: abolicion de murmullo vesicular", "Valoracion de edemas y signos de IC", "Busqueda de adenopatias (neoplasia o TB)"],
      "pruebas": [
        {"nombre": "Radiografia de torax", "descripcion": "Detecta derrames de mas de 200 mL; opacidad homogenea con concavidad superior (curva de Damoiseau)", "valoresReferencia": "Borramiento del seno costofrenico en derrames moderados", "cuidadosEnfermeria": ["Posicion PA estandar de pie", "En paciente encamado realizar en proyeccion lateral si es posible", "Comparar con Rx previa"]},
        {"nombre": "Ecografia pleural", "descripcion": "Gold standard para guiar toracocentesis; detecta derrames loculados", "valoresReferencia": "Cuantifica volumen y caracteriza el liquido (anecoico vs ecogenico)", "cuidadosEnfermeria": ["Posicionar sentado o en decubito lateral", "Marcar sitio de puncion con dermografo", "Preparar equipo de toracocentesis"]},
        {"nombre": "Toracocentesis diagnostica", "descripcion": "Extraccion de liquido para analisis: citologia, bioquimica, cultivos, criterios de Light", "valoresReferencia": "Criterios de Light: proteinas > 3 g/dL, LDH > 200 UI/L sugieren exudado", "cuidadosEnfermeria": ["Posicionar sentado con brazos sobre mesa", "Monitorizar PA, FC y SpO2 durante el procedimiento", "Extraer maximo 1500 mL en primera sesion para evitar edema de reexpansion", "Rx de torax de control post-procedimiento"]},
        {"nombre": "TC de torax con contraste", "descripcion": "Caracteriza el derrame, detecta adenopatias, lesiones malignas y embolia pulmonar", "valoresReferencia": "Evalua densidad del liquido y presencia de enhancement pleural (empiema o mesotelioma)", "cuidadosEnfermeria": ["Verificar funcion renal y alergias al contraste", "Hidratacion pre y post contraste yodado"]}
      ]
    },
    "tratamientoMedico": {
      "objetivos": ["Tratar la causa subyacente (principal objetivo)", "Aliviar la disnea drenando el derrame si es grande o sintomatico", "Prevenir recurrencias en derrames malignos"],
      "farmacologico": [
        {"nombre": "Antibioticos (Amoxicilina-clavulanico)", "grupo": "Antibiotico betalactamico con inhibidor de betalactamasas", "mecanismo": "Tratamiento del derrame parapneumonico complicado o empiema por bacterias grampositivas y anaerobios", "dosis": "1-2 g cada 8h IV; transicion a 875 mg VO cada 12h", "cuidadosEnfermeria": ["Administrar en 30 min IV", "Registrar alergias a penicilinas", "Controlar fiebre y PCR como marcadores de respuesta"]},
        {"nombre": "Furosemida", "grupo": "Diuretico de asa", "mecanismo": "Reduce el derrame pleural trasudativo secundario a IC aumentando la eliminacion de sodio y agua", "dosis": "20-80 mg/dia IV o VO segun respuesta", "cuidadosEnfermeria": ["Monitorizar diuresis y peso diario", "Controlar electrolitos: hipopotasemia e hiponatremia", "Vigilar signos de deshidratacion"]},
        {"nombre": "Talco para pleurodesis", "grupo": "Agente esclerosante", "mecanismo": "Produce inflamacion pleural controlada que fusiona las hojas pleurales, previniendo reacumulacion en derrames malignos recurrentes", "dosis": "5 g de talco en slurry o poudrage por toracoscopia", "cuidadosEnfermeria": ["Administrar analgesicos previos (dolor intenso post-procedimiento)", "Monitorizar SpO2 post-pleurodesis", "Posicionar al paciente en distintas posiciones para distribuir el talco"]}
      ],
      "noFarmacologico": ["Toracocentesis evacuadora terapeutica si disnea significativa", "Drenaje pleural con tubo si empiema o hemotorax", "Drenaje pleural con cateter tunelizado en derrames malignos recurrentes", "Pleurodesis quimica o toracoscopia en derrames malignos"],
      "quirurgico": ["Decorticacion pleural en empiema tabicado cronifico", "VATS (cirugia toracoscopica) para diagnostico y tratamiento", "Pleurodesis por toracoscopia con talco en derrames malignos"]
    },
    "cuidadosEnfermeria": {
      "valoracion": ["Monitorizar disnea con escala numerica y SpO2", "Auscultar campos pulmonares antes y despues de procedimientos", "Evaluar caracteristicas del dolor toracico", "Controlar signos vitales: fiebre, taquicardia, taquipnea"],
      "intervenciones": ["Posicionar en semifowler o fowler para aliviar disnea", "Administrar oxigenoterapia si SpO2 < 92%", "Preparar y asistir en toracocentesis (material esteril, posicion del paciente)", "Medir y documentar caracteristicas del liquido extraido: color, turbidez, cantidad", "Rx de torax de control post-procedimiento"],
      "educacionPaciente": ["Explicar causa del derrame y plan de tratamiento", "Indicar cuando consultar: aumento de disnea, fiebre, dolor toracico intenso", "Importancia del tratamiento de la enfermedad subyacente", "Si tubo de drenaje: cuidados del tubo y cuando consultar"],
      "monitorizacion": ["SpO2 continua si sintomatico", "Signos vitales cada 4-6h", "Cantidad de drenaje si hay tubo pleural", "Rx torax de control segun evolucion"]
    },
    "npiNanda": [
      {"codigo": "00032", "nombre": "Patron respiratorio ineficaz", "definicion": "La inspiracion o espiracion no proporciona ventilacion adecuada", "caracteristicasDefinitorias": ["Disnea", "Disminucion del murmullo vesicular", "SpO2 reducida", "Uso de musculos accesorios"], "factoresRelacionados": ["Compresion pulmonar por liquido pleural"]},
      {"codigo": "00132", "nombre": "Dolor agudo", "definicion": "Experiencia sensitiva y emocional desagradable asociada con dano tisular", "caracteristicasDefinitorias": ["Dolor pleuritico en puntada", "Posicion antialgica", "Taquicardia"], "factoresRelacionados": ["Inflamacion pleural en derrames exudativos"]},
      {"codigo": "00004", "nombre": "Riesgo de infeccion", "definicion": "Riesgo de ser invadido por organismos patogenos", "caracteristicasDefinitorias": ["Procedimiento invasivo de toracocentesis"], "factoresRelacionados": ["Toracocentesis o drenaje pleural", "Empiema subyacente"]}
    ],
    "npiNic": [
      {"codigo": "3350", "nombre": "Monitorizacion respiratoria", "actividades": ["Monitorizar FR, SpO2 y signos de dificultad respiratoria", "Auscultar campos pulmonares cada turno", "Registrar cambios en el patron respiratorio"]},
      {"codigo": "1872", "nombre": "Cuidados del tubo de torax", "actividades": ["Mantener sello de agua correcto", "Registrar cantidad y caracteristicas del drenaje", "Vigilar fugas de aire (burbujeo continuo)", "Mantener sistema por debajo del nivel del pecho"]},
      {"codigo": "1400", "nombre": "Manejo del dolor", "actividades": ["Evaluar dolor con escala numerica", "Administrar analgesicos previo a procedimientos", "Posicionar al paciente para aliviar dolor pleuritico"]}
    ],
    "npiNoc": [
      {"codigo": "0403", "nombre": "Estado respiratorio: ventilacion", "indicadores": ["SpO2 > 92%", "Ausencia de disnea en reposo", "Murmullo vesicular presente en bases"], "escala": "1=Desviacion grave, 5=Sin desviacion"},
      {"codigo": "0702", "nombre": "Estado de los signos vitales", "indicadores": ["FR 12-20 rpm", "SpO2 > 92%", "Afebril"], "escala": "1=Desviacion grave, 5=Sin desviacion"}
    ],
    "complicaciones": ["Empiema pleural", "Fibrosis y atrapamiento pulmonar", "Edema de reexpansion pulmonar post-drenaje", "Neumotorax iatrogeno por toracocentesis", "Fistula broncopleural"],
    "criteriosAlarma": ["Disnea severa con SpO2 < 90%", "Fiebre con liquido purulento (empiema)", "Hemoptisis o salida de sangre por tubo pleural", "Desviacion traqueal (derrame masivo con tension)", "Dolor toracico con hipotension (hemotorax)"],
    "emergencyLevel": "moderado",
    "relatedPathologyIds": ["pat_icc", "pat_neumonia"],
    "isPremium": True
  },
  {
    "id": "pat_fibrosis_pulmonar",
    "nombre": "Fibrosis Pulmonar",
    "bodySystemId": "respiratorio",
    "definicion": "Enfermedad pulmonar intersticial cronica y progresiva caracterizada por la acumulacion excesiva de tejido fibroso en el intersticio pulmonar, que destruye la arquitectura normal del pulmon y reduce progresivamente la capacidad de intercambio gaseoso.",
    "epidemiologia": "La fibrosis pulmonar idiopatica (FPI) tiene una prevalencia de 13-20 casos por 100.000 habitantes. Predomina en hombres mayores de 60 anos. La supervivencia media desde el diagnostico es de 3-5 anos.",
    "factoresRiesgo": ["Tabaquismo (principal factor de riesgo para FPI)", "Edad avanzada (> 60 anos)", "Sexo masculino", "Exposicion a polvos organicos (aves, mohos: neumonitis por hipersensibilidad)", "Exposicion a asbesto o silice", "Enfermedades autoinmunes (AR, LES, esclerodermia)", "Mutaciones geneticas en surfactante o telomerasa", "Reflujo gastroesofagico cronico"],
    "fisiopatologia": "En la FPI, el dano repetido del epitelio alveolar activa fibroblastos que producen exceso de colageno tipo I y III, reemplazando el parenquima normal con tejido cicatricial. El patron histologico es la neumonia intersticial usual (NIU) con focos de fibroblastos activos (focos fibroblasticos), panalización y traccion bronquiectasica. La fibrosis progresiva reduce la distensibilidad pulmonar y aumenta el trabajo respiratorio.",
    "signosYSintomas": {
      "signos": ["Crepitantes secos tipo velcro en bases (hallazgo caracteristico)", "Acropaquias (hipocratismo digital) en 25-50%", "Taquipnea", "Cianosis central en fases avanzadas", "Signos de cor pulmonale en estadios avanzados: ingurgitacion yugular, edemas"],
      "sintomas": ["Disnea de esfuerzo progresiva de inicio insidioso (principal sintoma)", "Tos seca e irritativa persistente", "Fatiga cronica", "Perdida de peso en estadios avanzados"]
    },
    "clasificacion": {
      "nombre": "Clasificacion por severidad funcional",
      "tipos": [
        {"nombre": "Leve", "descripcion": "CVF > 70% y DLCO > 40%; minimos sintomas"},
        {"nombre": "Moderada", "descripcion": "CVF 50-70% y DLCO 30-40%; disnea con esfuerzos moderados"},
        {"nombre": "Severa", "descripcion": "CVF < 50% o DLCO < 30%; disnea con minimos esfuerzos; candidato a trasplante"},
        {"nombre": "Exacerbacion aguda", "descripcion": "Deterioro agudo sobre FPI cronica con nuevas opacidades; alta mortalidad"}
      ]
    },
    "diagnostico": {
      "anamnesis": ["Inicio y progresion de la disnea (meses o anos)", "Historia de tabaquismo y cuantificacion", "Exposiciones ocupacionales y ambientales detalladas", "Antecedentes de enfermedades autoinmunes", "Historia familiar de fibrosis pulmonar"],
      "examenFisico": ["Auscultacion: crepitantes tipo velcro en bases (bibasal)", "Inspeccion: acropaquias", "Frecuencia respiratoria en reposo y con esfuerzo", "Saturacion de oxigeno basal y con ejercicio (prueba de la marcha de 6 min)"],
      "pruebas": [
        {"nombre": "TACAR de torax (TC de alta resolucion)", "descripcion": "Estudio de eleccion: patron en panal (honeycombing) y bronquiectasias de traccion en bases y subpleural, sin vidrio esmerilado predominante", "valoresReferencia": "Patron tipico de NIU: 90% de especificidad para FPI", "cuidadosEnfermeria": ["No requiere contraste en la mayoria de los casos", "Informar sobre posicion y apnea inspiratoria durante la adquisicion"]},
        {"nombre": "Pruebas de funcion pulmonar (espirometria y DLCO)", "descripcion": "Patron restrictivo: CVF reducida, VEF1/CVF normal o aumentado; DLCO muy reducida", "valoresReferencia": "CVF < 80% predicho; DLCO < 70% predicho en FPI moderada-severa", "cuidadosEnfermeria": ["Verificar que el paciente no haya fumado ni usado broncodilatadores 4h antes", "Instruir en tecnica correcta de espirometria", "Registrar resultado para comparacion evolutiva cada 6 meses"]},
        {"nombre": "LBA (Lavado Broncoalveolar)", "descripcion": "Descarta otras causas de enfermedad intersticial; en FPI predominan neutrofilos", "valoresReferencia": "Neutrofilia > 3% orienta a FPI; linfocitosis > 30% sugiere NINE o NHP", "cuidadosEnfermeria": ["Preparar para broncoscopia: ayuno 8h, via venosa, monitoreo continuo", "Vigilar post-procedimiento: fiebre, broncoespasmo, desaturacion"]},
        {"nombre": "Prueba de la marcha de 6 minutos", "descripcion": "Mide distancia caminada en 6 min y desaturacion de oxigeno con el esfuerzo; valor pronostico", "valoresReferencia": "Normal > 400 m; desaturacion < 88% con esfuerzo = indicacion de oxigeno ambulatorio", "cuidadosEnfermeria": ["Realizar en pasillo estandar de 30 metros", "Monitorizar SpO2 y FC durante la prueba", "Tener oxigeno disponible por si hay desaturacion severa"]}
      ]
    },
    "tratamientoMedico": {
      "objetivos": ["Enlentecer la progresion de la fibrosis", "Controlar los sintomas", "Prevenir exacerbaciones agudas", "Considerar trasplante pulmonar en candidatos"],
      "farmacologico": [
        {"nombre": "Nintedanib", "grupo": "Inhibidor de tirosina cinasas (antifibrosante)", "mecanismo": "Inhibe receptores de PDGF, VEGF y FGF, reduciendo la activacion de fibroblastos y la produccion de colageno", "dosis": "150 mg cada 12h con alimentos", "cuidadosEnfermeria": ["Principal efecto adverso: diarrea (en 60%); indicar loperamida si ocurre", "Hepatotoxicidad: controlar transaminasas al inicio, a las 4 semanas y luego mensual", "No usar en embarazo; anticoncepcion eficaz obligatoria", "Administrar siempre con alimentos para reducir nauseas"]},
        {"nombre": "Pirfenidona", "grupo": "Antifibrosante de mecanismo multiple", "mecanismo": "Reduce proliferacion de fibroblastos y produccion de TGF-beta, enlenteciendo la perdida de CVF", "dosis": "Titulacion progresiva hasta 2403 mg/dia en 3 dosis con alimentos", "cuidadosEnfermeria": ["Fotosensibilidad: usar protector solar SPF 50 y ropa protectora al sol", "Nauseas y anorexia al inicio: titulacion lenta y toma con alimentos", "Controlar transaminasas mensualmente en el primer ano"]},
        {"nombre": "N-acetilcisteina", "grupo": "Antioxidante mucolítico", "mecanismo": "Reduce el estres oxidativo; uso limitado como adyuvante en algunos pacientes", "dosis": "600 mg cada 8h VO", "cuidadosEnfermeria": ["Bien tolerado en general", "Puede producir nauseas y reflujo: tomar con agua abundante", "No hay evidencia fuerte de beneficio en FPI como monoterapia"]}
      ],
      "noFarmacologico": ["Oxigenoterapia domiciliaria si SpO2 < 88% con esfuerzo o < 90% en reposo", "Rehabilitacion respiratoria: mejora capacidad de esfuerzo y calidad de vida", "Vacunacion: antigripal anual y antineumococica", "Cese del tabaquismo obligatorio", "Tratamiento de reflujo gastroesofagico (IBP)"],
      "quirurgico": ["Trasplante pulmonar bilateral (primera eleccion en candidatos elegibles con FPI severa o progresiva)", "Biopsia pulmonar por VATS cuando el diagnostico es incierto"]
    },
    "cuidadosEnfermeria": {
      "valoracion": ["Monitorizar SpO2 en reposo y con actividad", "Evaluar disnea con escala modificada de MRC (0-4)", "Controlar peso: perdida en estadios avanzados", "Escuchar crepitantes basales en cada turno"],
      "intervenciones": ["Administrar oxigenoterapia ajustando flujo para SpO2 > 90%", "Administrar antifibrosantes con comidas segun indicacion", "Posicionar en semifowler para reducir trabajo respiratorio", "Planificar actividades para evitar fatiga excesiva", "Educacion en tecnicas de ahorro energetico"],
      "educacionPaciente": ["Explicar naturaleza progresiva e incurable de la enfermedad con empatia", "Instruir en uso correcto de oxigeno domiciliario", "Cese del tabaquismo urgente", "Proteccion solar con nintedanib o pirfenidona", "Cuando consultar: empeoramiento brusco de disnea (posible exacerbacion aguda)"],
      "monitorizacion": ["SpO2 continua si en exacerbacion aguda", "CVF y DLCO cada 6 meses en FPI estable", "Transaminasas mensual en primer ano de antifibrosante", "Prueba de 6 min anual o si hay cambio clinico"]
    },
    "npiNanda": [
      {"codigo": "00032", "nombre": "Patron respiratorio ineficaz", "definicion": "Inspiracion o espiracion que no proporciona ventilacion adecuada", "caracteristicasDefinitorias": ["Disnea de esfuerzo", "Taquipnea", "Uso de musculos accesorios", "SpO2 reducida con el esfuerzo"], "factoresRelacionados": ["Reduccion de la distensibilidad pulmonar por fibrosis intersticial"]},
      {"codigo": "00092", "nombre": "Intolerancia a la actividad", "definicion": "Insuficiencia de energia para completar actividades diarias", "caracteristicasDefinitorias": ["Disnea con esfuerzos menores", "Fatiga cronica", "Desaturacion con la marcha"], "factoresRelacionados": ["Limitacion ventilatoria restrictiva", "Hipoxemia de esfuerzo"]},
      {"codigo": "00187", "nombre": "Disposicion para mejorar el poder personal", "definicion": "Patron de participacion consciente en el autocuidado que puede ser reforzado", "caracteristicasDefinitorias": ["Adhiere al tratamiento antifibrosante", "Usa oxigeno domiciliario correctamente"], "factoresRelacionados": ["Motivacion del paciente", "Apoyo familiar"]}
    ],
    "npiNic": [
      {"codigo": "3350", "nombre": "Monitorizacion respiratoria", "actividades": ["Monitorizar SpO2 en reposo y con actividad", "Registrar patron respiratorio y FR", "Identificar signos de exacerbacion aguda"]},
      {"codigo": "0180", "nombre": "Manejo de la energia", "actividades": ["Planificar actividades con periodos de descanso", "Ensenyar tecnicas de ahorro energetico", "Coordinar rehabilitacion respiratoria"]},
      {"codigo": "5510", "nombre": "Educacion para la salud", "actividades": ["Instruir en uso de oxigenoterapia domiciliaria", "Explicar efectos adversos de antifibrosantes y como manejarlos", "Educacion sobre proteccion solar"]}
    ],
    "npiNoc": [
      {"codigo": "0403", "nombre": "Estado respiratorio: ventilacion", "indicadores": ["SpO2 > 90% en reposo", "Disnea controlada en actividades cotidianas", "Uso eficaz del oxigeno domiciliario"], "escala": "1=Desviacion grave, 5=Sin desviacion"},
      {"codigo": "0005", "nombre": "Tolerancia a la actividad", "indicadores": ["Distancia en prueba de 6 min estable o mejorada", "SpO2 > 88% durante la marcha con oxigeno"], "escala": "1=Comprometido gravemente, 5=No comprometido"}
    ],
    "complicaciones": ["Insuficiencia respiratoria cronica con necesidad de oxigenoterapia permanente", "Exacerbacion aguda de FPI (alta mortalidad)", "Hipertension pulmonar secundaria", "Cancer de pulmon (riesgo aumentado)", "Cor pulmonale"],
    "criteriosAlarma": ["Empeoramiento brusco de disnea en dias (exacerbacion aguda)", "SpO2 < 88% en reposo", "Fiebre alta con aumento de disnea (infeccion sobre FPI)", "Hemoptisis", "Dolor toracico pleuritico (neumotorax)"],
    "emergencyLevel": "moderado",
    "relatedPathologyIds": ["pat_epoc"],
    "isPremium": True
  },
  {
    "id": "pat_sdra",
    "nombre": "Sindrome de Distres Respiratorio Agudo",
    "bodySystemId": "respiratorio",
    "definicion": "Insuficiencia respiratoria aguda grave caracterizada por inflamacion pulmonar difusa, aumento de la permeabilidad vascular, edema alveolar no cardiogenico, hipoxemia severa refractaria y opacidades bilaterales en la imagen toracica.",
    "epidemiologia": "Incidencia de 150-200 casos por 100.000 habitantes/ano. Mortalidad hospitalaria del 35-40% en SDRA moderado-severo. Es la principal causa de ingreso en UCI por causa respiratoria.",
    "factoresRiesgo": ["Neumonia grave (causa mas frecuente, 35% de los casos)", "Sepsis de cualquier origen (20-40%)", "Aspiracion de contenido gastrico", "Trauma torax multiple o politrauma", "Transfusion masiva de sangre (TRALI)", "Pancreatitis aguda severa", "Inhalacion de humos o toxicos"],
    "fisiopatologia": "El dano alveolar difuso produce rotura de la barrera alveolo-capilar con extravasacion de liquido proteinaceo al alveolo. Los neutrofilos liberan citocinas proinflamatorias (IL-1, IL-6, TNF-alfa), radicales libres y proteasas que amplifican el dano. Los alveolos se llenan de exudado inflamatorio y la surfactante se inactiva, produciendo colapso alveolar difuso, shunt pulmonar masivo e hipoxemia refractaria. La relacion PaO2/FiO2 < 300 define el SDRA.",
    "signosYSintomas": {
      "signos": ["Taquipnea severa (> 30 rpm)", "Uso de musculos accesorios", "Cianosis central", "Hipoxemia refractaria al oxigeno (PaO2/FiO2 < 300)", "Opacidades bilaterales difusas en Rx y TC", "Estertores crepitantes difusos en ambos campos"],
      "sintomas": ["Disnea severa de inicio agudo (< 7 dias)", "Sensacion de ahogo extremo", "Agitacion o confusion por hipoxemia cerebral"]
    },
    "clasificacion": {
      "nombre": "Criterios de Berlin (2012)",
      "tipos": [
        {"nombre": "Leve", "descripcion": "PaO2/FiO2 200-300 mmHg con PEEP o CPAP >= 5 cmH2O"},
        {"nombre": "Moderado", "descripcion": "PaO2/FiO2 100-200 mmHg con PEEP >= 5 cmH2O"},
        {"nombre": "Severo", "descripcion": "PaO2/FiO2 < 100 mmHg con PEEP >= 5 cmH2O; mortalidad 45%"}
      ]
    },
    "diagnostico": {
      "anamnesis": ["Inicio agudo en < 7 dias", "Causa precipitante identificable (neumonia, sepsis, trauma)", "Ausencia de IC como causa del edema (o descartar con ecocardiograma)"],
      "examenFisico": ["Evaluacion del patron respiratorio y uso de musculos accesorios", "Auscultacion: estertores difusos bilaterales", "Estado hemodinamico: PA, FC, signos de perfusion"],
      "pruebas": [
        {"nombre": "Gasometria arterial", "descripcion": "Define severidad: calcula PaO2/FiO2 con FiO2 conocida", "valoresReferencia": "PaO2/FiO2 < 300 en SDRA; < 100 en severo", "cuidadosEnfermeria": ["Extraer bajo FiO2 conocida y estable al menos 30 min", "Manejar muestra en hielo", "Resultado urgente en menos de 15 min"]},
        {"nombre": "Radiografia de torax", "descripcion": "Opacidades bilaterales alveolares difusas no explicadas por otra causa (no derrame, no atelectasia lobar)", "valoresReferencia": "Infiltrados bilaterales difusos; no cardiomegalia", "cuidadosEnfermeria": ["Proyeccion AP en cama en ventilacion mecanica", "Comparar con Rx anterior si existe"]},
        {"nombre": "TC torax", "descripcion": "Caracteriza distribucion del dano: areas de consolidacion, vidrio esmerilado, zonas sanas dorsales (reclutables)", "valoresReferencia": "Patron heterogeneo tipico de SDRA: consolidacion declive + vidrio esmerilado", "cuidadosEnfermeria": ["Transportar con monitoreo completo y ventilacion manual o portable", "Preparar equipo de emergencia para el traslado"]},
        {"nombre": "Ecocardiograma", "descripcion": "Descarta IC como causa del edema pulmonar bilateral", "valoresReferencia": "FEVI normal, sin signos de disfuncion diastolica severa descarta IC", "cuidadosEnfermeria": ["Puede realizarse al lado de la cama (ecocardiograma de punto de cuidado)", "No interrumpir ventilacion mecanica durante el estudio"]}
      ]
    },
    "tratamientoMedico": {
      "objetivos": ["Mantener oxigenacion adecuada mientras se resuelve la causa", "Evitar dano pulmonar inducido por el ventilador (VILI)", "Tratar la causa desencadenante (ej: antibioticos en neumonia)", "Prevenir fallo multiorganico"],
      "farmacologico": [
        {"nombre": "Corticoides (Metilprednisolona)", "grupo": "Corticosteroide sistémico", "mecanismo": "Reduce la inflamacion sistemica en SDRA moderado-severo persistente (> 7 dias); evidencia en SDRA por COVID-19", "dosis": "1-2 mg/kg/dia IV en SDRA moderado-severo con mas de 7 dias de evolucion", "cuidadosEnfermeria": ["Controlar glucemia cada 4-6h (hiperglucemia frecuente)", "Vigilar infecciones secundarias", "No usar en SDRA de causa traumatica o en los primeros 7 dias (puede ser perjudicial)"]},
        {"nombre": "Neurorelajantes (Cisatracurio)", "grupo": "Bloqueante neuromuscular", "mecanismo": "Elimina el esfuerzo respiratorio espontaneo asincronico con el ventilador en las primeras 48h de SDRA severo", "dosis": "37.5 mg bolo seguido de infusion 37.5 mg/h por 48h", "cuidadosEnfermeria": ["SIEMPRE con sedoanalgesia profunda simultanea", "Vigilar acumulacion de secreciones (no tose)", "Posicion prona recomendada simultaneamente", "Monitorizar tren de cuatro con neuroestimulador"]},
        {"nombre": "Antibioticos de amplio espectro", "grupo": "Antibioticos para tratar causa precipitante", "mecanismo": "Tratamiento de la causa precipitante infecciosa (neumonia, sepsis)", "dosis": "Segun foco infeccioso y germen identificado (cultivos previos)", "cuidadosEnfermeria": ["Extraer hemocultivos antes del inicio", "Administrar primera dosis en menos de 1 hora de indicado", "Ajustar dosis en insuficiencia renal"]}
      ],
      "noFarmacologico": ["Ventilacion mecanica protectora: VT 6 mL/kg de peso ideal, PEEP titulada, presion meseta < 30 cmH2O", "Posicion prona 16-18h/dia en SDRA moderado-severo (PaO2/FiO2 < 150): reduce mortalidad", "Balance hidrico neutro o negativo una vez hemodinamicamente estable", "Estrategia de sedacion con objetivo RASS -1 a -2"],
      "quirurgico": ["ECMO (oxigenacion de membrana extracorporea) veno-venosa en SDRA severo refractario a ventilacion protectora"]
    },
    "cuidadosEnfermeria": {
      "valoracion": ["Monitorizar parametros ventilatorios: VT, FiO2, PEEP, presion meseta cada hora", "Gasometria arterial cada 4-6h o segun cambios de parametros", "Evaluar sincronismo paciente-ventilador", "Monitorizar balance hidrico estricto (ingresos-egresos)"],
      "intervenciones": ["Ejecutar protocolo de posicion prona con equipo de 5 personas (prono-team)", "Cuidados en prono: proteger ojos, nariz, orejas y prominencias oseas", "Aspiracion de secreciones por sistema cerrado", "Higiene oral con clorhexidina cada 6h (prevencion de NAVM)", "Mantener cabecera a 30-45 grados (excepto en prono)"],
      "educacionPaciente": ["Dado que el paciente suele estar sedado, la educacion es principalmente a la familia", "Informar a familia sobre el estado critico y el plan terapeutico", "Preparar a la familia para la posible imagen del paciente en prono con multiples dispositivos"],
      "monitorizacion": ["Parametros ventilatorios continuo", "SpO2 continua", "Gasometria cada 4-6h", "Balance hidrico horario", "Presion de meseta y driving pressure en cada cambio de parametros"]
    },
    "npiNanda": [
      {"codigo": "00030", "nombre": "Deterioro del intercambio gaseoso", "definicion": "Exceso o deficit en la oxigenacion o eliminacion de dioxido de carbono en la membrana alveolo-capilar", "caracteristicasDefinitorias": ["PaO2/FiO2 < 300", "Hipoxemia refractaria", "Cianosis central", "Taquipnea"], "factoresRelacionados": ["Dano alveolar difuso", "Edema pulmonar no cardiogenico", "Colapso alveolar"]},
      {"codigo": "00029", "nombre": "Disminucion del gasto cardiaco", "definicion": "Cantidad insuficiente de sangre bombeada", "caracteristicasDefinitorias": ["Hipotension", "Taquicardia", "Mala perfusion periferica"], "factoresRelacionados": ["PEEP elevada con reduccion de precarga", "Sepsis subyacente"]},
      {"codigo": "00004", "nombre": "Riesgo de infeccion", "definicion": "Riesgo de ser invadido por organismos patogenos", "caracteristicasDefinitorias": ["Intubacion orotraqueal prolongada"], "factoresRelacionados": ["Ventilacion mecanica invasiva", "Inmunosupresion relativa por corticoides"]}
    ],
    "npiNic": [
      {"codigo": "3300", "nombre": "Manejo de la ventilacion mecanica", "actividades": ["Mantener VT 6 mL/kg de peso ideal", "Titular PEEP para mantener SpO2 > 88-90%", "Monitorizar presion de meseta (< 30 cmH2O)", "Registrar parametros ventilatorios cada hora"]},
      {"codigo": "0740", "nombre": "Cuidados del paciente encamado", "actividades": ["Ejecutar protocolo de posicion prona cada 16-18h", "Proteger prominencias oseas con apopsitos de espuma", "Rotar al decubito supino con equipo entrenado"]},
      {"codigo": "6540", "nombre": "Control de infecciones", "actividades": ["Higiene oral con clorhexidina cada 6h", "Aspiracion por sistema cerrado", "Cambio de circuito segun protocolo"]}
    ],
    "npiNoc": [
      {"codigo": "0402", "nombre": "Estado respiratorio: intercambio gaseoso", "indicadores": ["PaO2/FiO2 en mejoria progresiva", "SpO2 > 88% con FiO2 reducible", "pH > 7.25"], "escala": "1=Desviacion grave, 5=Sin desviacion"},
      {"codigo": "0703", "nombre": "Severidad de la infeccion", "indicadores": ["Ausencia de fiebre", "PCR en descenso", "Sin nueva consolidacion en Rx"], "escala": "1=Grave, 5=Ninguna"}
    ],
    "complicaciones": ["Fallo multiorganico", "Neumonia asociada a ventilacion mecanica (NAVM)", "Barotrauma: neumomediastino, neumotrax", "Fibrosis pulmonar post-SDRA", "Debilidad muscular adquirida en UCI"],
    "criteriosAlarma": ["PaO2/FiO2 < 100 refractario a PEEP y prono (indicacion de ECMO)", "Neumotrax hipertensivo: desviacion traqueal, hipotension brusca, ingurgitacion yugular", "Hipotension refractaria con vasopresores maximos", "Arritmias malignas por hipoxemia severa"],
    "emergencyLevel": "critico",
    "relatedPathologyIds": ["pat_neumonia", "pat_sepsis"],
    "isPremium": True
  },
  {
    "id": "pat_bronquiectasias",
    "nombre": "Bronquiectasias",
    "bodySystemId": "respiratorio",
    "definicion": "Dilatacion anormal e irreversible de los bronquios de mediano calibre causada por destruccion de las capas muscular y elastica de la pared bronquial, asociada a inflamacion cronica y colonizacion bacteriana con ciclos de infeccion-inflamacion que perpetuan el dano.",
    "epidemiologia": "Prevalencia de 67-566 casos por 100.000 habitantes en paises desarrollados, con tendencia creciente. Mas frecuente en mujeres mayores de 60 anos. Principal causa identificable: infecciones respiratorias previas graves.",
    "factoresRiesgo": ["Infecciones pulmonares graves en la infancia (sarampion, tos ferina, TB)", "Fibrosis quistica (causa mas frecuente en jovenes)", "Inmunodeficiencias primarias o secundarias", "Discinesia ciliar primaria", "EPOC severo (causa emergente en adultos)", "Artritis reumatoide y otras conectivopatias", "Broncoaspiracion cronica"],
    "fisiopatologia": "El circulo vicioso de Cole: la infeccion produce inflamacion bronquial con liberacion de proteasas que danan el moco y los cilios, favoreciendo la colonizacion bacteriana cronica (principalmente Pseudomonas aeruginosa y Haemophilus influenzae). La respuesta inflamatoria cronica destruye el tejido elasto-muscular de la pared bronquial produciendo dilatacion permanente. Las exacerbaciones infecciosas aceleran el deterioro de la funcion pulmonar.",
    "signosYSintomas": {
      "signos": ["Crepitantes gruesos o sibilancias en areas afectadas", "Esputo purulento abundante (signo cardinal)", "Acropaquias en casos severos", "Hemoptisis (leve a masiva en un 10-15%)", "Disminucion del murmullo vesicular focal"],
      "sintomas": ["Tos productiva cronica con esputo mucopurulento abundante (principal sintoma)", "Disnea progresiva", "Fatiga cronica", "Fiebre recurrente en exacerbaciones", "Dolor pleuritico en exacerbaciones agudas"]
    },
    "clasificacion": {
      "nombre": "Clasificacion morfologica (TACAR)",
      "tipos": [
        {"nombre": "Cilindricas", "descripcion": "Dilatacion uniforme del bronquio; forma mas leve; patron en rieles de tren"},
        {"nombre": "Varicosas", "descripcion": "Dilatacion irregular con estrechamientos; forma intermedia"},
        {"nombre": "Saculares o quisticas", "descripcion": "Dilatacion en racimos de uvas; forma mas severa; alta incidencia de hemoptisis"}
      ]
    },
    "diagnostico": {
      "anamnesis": ["Tos productiva cronica: cantidad, color y consistencia del esputo", "Historia de infecciones respiratorias repetidas desde la infancia", "Antecedente de fibrosis quistica, inmunodeficiencia o conectivopatia", "Hemoptisis: frecuencia y cantidad"],
      "examenFisico": ["Auscultacion: crepitantes gruesos y sibilancias inspiratorias y espiratorias", "Inspeccion de esputo: purulento, en tres capas (espumosa, mucosa, purulenta)", "Acropaquias en casos severos"],
      "pruebas": [
        {"nombre": "TACAR de torax", "descripcion": "Estudio de eleccion: detecta dilatacion bronquial (diametro bronquial > diametro arteria adyacente = signo del anillo de sello) y engrosamiento de pared", "valoresReferencia": "Relacion bronco-arterial > 1.0 confirma bronquiectasias", "cuidadosEnfermeria": ["No requiere contraste habitualmente", "Informar al paciente sobre apneas durante la adquisicion"]},
        {"nombre": "Cultivo de esputo con antibiograma", "descripcion": "Identifica el germen colonizador y su sensibilidad antibiotic; guia el tratamiento antibiotico", "valoresReferencia": "Colonizacion cronica por Pseudomonas aeruginosa: peor pronostico", "cuidadosEnfermeria": ["Obtener esputo matutino en ayunas antes de antibioticos", "Pedir al paciente que realice lavado bucal previo con agua (sin antiseptico)", "Transportar en recipiente esteril a temperatura ambiente en menos de 2h"]},
        {"nombre": "Espirometria con broncodilatador", "descripcion": "Evalua patron obstructivo o mixto y respuesta broncodilatadora", "valoresReferencia": "Patron obstructivo (VEF1/CVF < 0.7) en la mayoria; CVF reducida en enfermedad avanzada", "cuidadosEnfermeria": ["Verificar que no haya tomado broncodilatador 4-6h antes", "Instruir en tecnica correcta de espirometria"]},
        {"nombre": "Test del sudor y estudio genetico CFTR", "descripcion": "Descarta fibrosis quistica en pacientes jovenes con bronquiectasias difusas", "valoresReferencia": "Cloro en sudor > 60 mEq/L = fibrosis quistica", "cuidadosEnfermeria": ["Realizar en ayunas", "Limpiar la zona de estimulacion con alcohol sin tocar con manos", "Pesar el papel de filtro antes y despues de la recogida"]}
      ]
    },
    "tratamientoMedico": {
      "objetivos": ["Reducir la frecuencia e intensidad de las exacerbaciones", "Mejorar el aclaramiento mucociliar", "Controlar la colonizacion bacteriana cronica", "Preservar la funcion pulmonar"],
      "farmacologico": [
        {"nombre": "Amoxicilina-clavulanico o Ciprofloxacino", "grupo": "Antibiotico para exacerbaciones", "mecanismo": "Cubre los germenes habituales en exacerbaciones agudas (H. influenzae, S. pneumoniae) y Pseudomonas (ciprofloxacino)", "dosis": "Amoxicilina-clavulanico 875 mg c/12h 14 dias o Ciprofloxacino 750 mg c/12h 14 dias si hay Pseudomonas", "cuidadosEnfermeria": ["Obtener cultivo previo al antibiotico", "Administrar con alimentos para reducir intolerancia digestiva", "Vigilar superinfeccion por Clostridium con amoxicilina-clavulanico"]},
        {"nombre": "Tobramicina inhalada", "grupo": "Antibiotico inhalado para colonizacion cronica por Pseudomonas", "mecanismo": "Alcanza altas concentraciones en via aerea con minima absorcion sistemica; reduce carga bacteriana cronica", "dosis": "300 mg nebulizacion cada 12h en ciclos de 28 dias on/28 dias off", "cuidadosEnfermeria": ["Instruir en tecnica de nebulizacion correcta (boquilla, no mascarilla)", "Realizar fisioterapia respiratoria antes de nebulizar para abrir la via aerea", "Vigilar broncoespasmo post-inhalacion: tener salbutamol disponible"]},
        {"nombre": "Salbutamol inhalado (broncodilatador)", "grupo": "Agonista beta-2 de accion corta", "mecanismo": "Broncodilatacion que facilita el aclaramiento de secreciones y la fisioterapia respiratoria", "dosis": "200-400 mcg antes de fisioterapia y nebulizacion de antibiotico", "cuidadosEnfermeria": ["Verificar tecnica inhalatoria correcta", "Usar espaciador para maximizar deposito pulmonar", "Usar 15 min antes de la fisioterapia respiratoria"]}
      ],
      "noFarmacologico": ["Fisioterapia respiratoria 2 veces/dia: tecnica de espiacion forzada (huff), drenaje autogenico, Flutter o Aerobika", "Hidratacion oral abundante para fluidificar secreciones", "Vacunacion antigripal anual y antineumococica", "Actividad fisica regular", "Cese del tabaquismo"],
      "quirurgico": ["Reseccion pulmonar segmentaria o lobectomia en bronquiectasias localizadas no controladas medicamente", "Embolizacion bronquial urgente en hemoptisis masiva"]
    },
    "cuidadosEnfermeria": {
      "valoracion": ["Cuantificar y describir el esputo diariamente: cantidad, color, consistencia", "Monitorizar SpO2 y FR en reposo y con actividad", "Evaluar coloracion de esputo como indicador de exacerbacion (verde purulento = infeccion activa)", "Auscultar campos pulmonares: crepitantes y sibilancias"],
      "intervenciones": ["Ensenyar y supervisar tecnica de fisioterapia respiratoria (huff y drenaje autogenico)", "Posicionar en decubito lateral con el pulmon mas afectado arriba para drenaje postural", "Administrar broncodilatadores previo a fisioterapia", "Administrar antibioticos inhalados segun protocolo", "Fomentar hidratacion oral de al menos 2 litros al dia"],
      "educacionPaciente": ["Instruccion practica en tecnicas de fisioterapia respiratoria (demostrar y que el paciente demuestre)", "Uso correcto del dispositivo de oscilacion (Flutter, Aerobika)", "Signos de exacerbacion: aumento de esputo, cambio de color a verde, fiebre, mayor disnea", "Cuando y como usar antibioticos de rescate si tiene prescripcion de plan de accion"],
      "monitorizacion": ["Cantidad y caracteristicas del esputo diariamente", "SpO2 en reposo", "Temperatura para detectar exacerbaciones precozmente", "Spirometria cada 6 meses para seguimiento de funcion pulmonar"]
    },
    "npiNanda": [
      {"codigo": "00031", "nombre": "Limpieza ineficaz de las vias aereas", "definicion": "Incapacidad para eliminar secreciones u obstrucciones del tracto respiratorio", "caracteristicasDefinitorias": ["Esputo purulento abundante", "Tos ineficaz", "Crepitantes gruesos", "Disnea"], "factoresRelacionados": ["Secreciones bronquiales excesivas y espesas", "Alteracion del aclaramiento mucociliar"]},
      {"codigo": "00004", "nombre": "Riesgo de infeccion", "definicion": "Riesgo de ser invadido por organismos patogenos", "caracteristicasDefinitorias": ["Esputo purulento", "Fiebre recurrente"], "factoresRelacionados": ["Colonizacion bronquial cronica", "Alteracion de los mecanismos de defensa respiratoria"]},
      {"codigo": "00092", "nombre": "Intolerancia a la actividad", "definicion": "Insuficiencia de energia para completar actividades diarias", "caracteristicasDefinitorias": ["Disnea con esfuerzos", "Fatiga cronica"], "factoresRelacionados": ["Limitacion ventilatoria obstructiva", "Hipoxemia de esfuerzo"]}
    ],
    "npiNic": [
      {"codigo": "3230", "nombre": "Fisioterapia respiratoria", "actividades": ["Realizar tecnica de espiacion forzada (huff) 2 veces al dia", "Aplicar drenaje postural segun localizacion de bronquiectasias", "Ensenyar uso del dispositivo de oscilacion (Flutter)", "Administrar broncodilatador 15 min antes"]},
      {"codigo": "3160", "nombre": "Aspiracion de vias aereas", "actividades": ["Aspirar secreciones si el paciente no puede expectorar eficazmente", "Usar tecnica esteril", "Monitorizar SpO2 durante la aspiracion"]},
      {"codigo": "5510", "nombre": "Educacion para la salud", "actividades": ["Demostrar y evaluar tecnica de fisioterapia respiratoria", "Instruir en signos de exacerbacion y plan de accion", "Educar sobre uso correcto de nebulizadores"]}
    ],
    "npiNoc": [
      {"codigo": "0410", "nombre": "Estado respiratorio: permeabilidad de las vias aereas", "indicadores": ["Expectoracion eficaz de secreciones", "Ausencia de crepitantes gruesos post-fisioterapia", "SpO2 estable"], "escala": "1=Desviacion grave, 5=Sin desviacion"},
      {"codigo": "1902", "nombre": "Control del riesgo", "indicadores": ["Realiza fisioterapia diariamente", "Reconoce signos de exacerbacion", "Consulta precozmente en exacerbaciones"], "escala": "1=Nunca, 5=Constantemente"}
    ],
    "complicaciones": ["Hemoptisis masiva (urgencia toracica)", "Insuficiencia respiratoria cronica", "Cor pulmonale", "Colonizacion por Pseudomonas aeruginosa multirresistente", "Amiloidosis secundaria en casos de larga evolucion"],
    "criteriosAlarma": ["Hemoptisis masiva (> 200 mL/24h)", "SpO2 < 90% en reposo", "Fiebre alta con aumento de esputo purulento (exacerbacion grave)", "Disnea severa en reposo", "Taquipnea > 30 rpm"],
    "emergencyLevel": "moderado",
    "relatedPathologyIds": ["pat_epoc", "pat_neumonia"],
    "isPremium": True
  },
  {
    "id": "pat_cancer_pulmon",
    "nombre": "Cancer de Pulmon",
    "bodySystemId": "respiratorio",
    "definicion": "Neoplasia maligna que se origina en el epitelio bronquial o alveolar. Se clasifica en cancer de pulmon de celulas no pequenas (CPCNP, 85%) y cancer de pulmon de celulas pequenas (CPCP, 15%), con diferentes biologias, tratamientos y pronosticos.",
    "epidemiologia": "Primera causa de muerte por cancer a nivel mundial (1.8 millones de muertes/ano). Supervivencia global a 5 anos del 15-20%. La deteccion precoz con TC de baja dosis en fumadores de alto riesgo mejora la supervivencia.",
    "factoresRiesgo": ["Tabaquismo (causa del 85-90% de los casos; riesgo 20 veces mayor que no fumadores)", "Tabaquismo pasivo", "Exposicion a asbesto (efecto sinergico con tabaco)", "Exposicion a radón (segunda causa en no fumadores)", "Contaminacion atmosferica", "Historia familiar de cancer de pulmon", "Fibrosis pulmonar preexistente", "Infeccion por VIH"],
    "fisiopatologia": "El humo del tabaco contiene mas de 70 cancerigenos que producen mutaciones en oncogenes (KRAS, EGFR, ALK) y genes supresores de tumores (TP53, RB1). En el CPCNP, las mutaciones conductoras (EGFR, ALK, ROS1, KRAS G12C) son el blanco de terapias dirigidas especificas. En el CPCP, la perdida de TP53 y RB1 produce un tumor de crecimiento muy rapido con alta tendencia a la diseminacion temprana.",
    "signosYSintomas": {
      "signos": ["Perdida de peso significativa (> 5% en 6 meses)", "Sindrome de vena cava superior: edema facial y de cuello", "Paralisis del nervio recurrente laringeo (voz bitonal)", "Sindrome de Horner (ptosis, miosis, anhidrosis)", "Acropaquias", "Adenopatias supraclaviculares", "Derrame pleural maligno recurrente"],
      "sintomas": ["Tos nueva o cambio en tos cronica (principal sintoma)", "Hemoptisis", "Disnea de aparicion o empeoramiento progresivo", "Dolor toracico (sugiere invasion pleural o costal)", "Disfagia (invasion de esofago)", "Sindrome paraneoplasico: hipercalcemia, hiponatremia (SIADH), Cushing", "Sintomas de metastasis: cefalea, fractura patologica, ictericia"]
    },
    "clasificacion": {
      "nombre": "Clasificacion histologica e histomolecular",
      "tipos": [
        {"nombre": "Adenocarcinoma (CPCNP)", "descripcion": "40% de todos los CP; mas frecuente en no fumadores y mujeres; alta tasa de mutaciones EGFR, ALK"},
        {"nombre": "Carcinoma escamoso (CPCNP)", "descripcion": "30%; central, fuertemente asociado a tabaco; mutaciones FGFR1"},
        {"nombre": "Carcinoma de celulas grandes (CPCNP)", "descripcion": "10%; diagnostico de exclusion; peor pronostico dentro del CPCNP"},
        {"nombre": "Carcinoma microcítico (CPCP)", "descripcion": "15%; crecimiento rapido, diseminacion temprana; muy sensible a quimiorradioterapia inicial pero recae precozmente"}
      ]
    },
    "diagnostico": {
      "anamnesis": ["Historia de tabaquismo: cuantificacion en paquetes-anio", "Exposiciones laborales (asbesto, silice, arsenico)", "Hemoptisis: cantidad y frecuencia", "Perdida de peso y apetito", "Sintomas neurologicos o musculoesqueleticos (metastasis)"],
      "examenFisico": ["Auscultacion: disminucion de MV o atelectasia", "Busqueda de adenopatias supraclaviculares y axilares", "Examen neurologico basico para detectar metastasis", "Signos de sindrome de vena cava superior o de Horner"],
      "pruebas": [
        {"nombre": "TC de torax con contraste", "descripcion": "Estudio de eleccion: caracteriza la lesion primaria, adenopatias mediastinicas y posibles metastasis hepaticas y suprarrenales", "valoresReferencia": "Nodulo solido > 8 mm: biopsia indicada; nodulo espiculado de alta sospecha", "cuidadosEnfermeria": ["Verificar funcion renal y alergia al contraste", "Hidratacion pre y post contraste yodado", "Preparar al paciente para la duracion del procedimiento"]},
        {"nombre": "Broncoscopia con biopsia y EBUS", "descripcion": "Obtiene histologia del tumor primario y estadifica ganglios mediastinicos mediante EBUS", "valoresReferencia": "Rendimiento diagnostico > 90% en tumores centrales accesibles", "cuidadosEnfermeria": ["Ayuno de 6-8h previo", "Via venosa permeable y monitoreo continuo", "Vigilar hemoptisis, broncoespasmo y neumotorax post-procedimiento"]},
        {"nombre": "Biopsia y estudio molecular completo", "descripcion": "Estudio obligatorio en CPCNP: EGFR, ALK, ROS1, KRAS G12C, PD-L1 para determinar tratamiento oncologico", "valoresReferencia": "EGFR mutado = osimertinib; ALK+ = alectinib; PD-L1 > 50% = pembrolizumab", "cuidadosEnfermeria": ["Preservar tejido tumoral en fijador adecuado para estudio molecular", "Enviar muestra en formalina neutra tamponada al 10%"]},
        {"nombre": "PET-TC con FDG", "descripcion": "Estadificacion sistemica: detecta metastasis ocultas y evalua respuesta al tratamiento", "valoresReferencia": "SUVmax > 2.5 sugiere malignidad en nodulos pulmonares", "cuidadosEnfermeria": ["Ayuno de 6h", "Glucemia < 150 mg/dL antes del estudio", "Reposo absoluto 1h post-inyeccion del radiotrazador"]}
      ]
    },
    "tratamientoMedico": {
      "objetivos": ["Curacion en estadios iniciales (I-II) con cirugia o radioterapia estereotaxica", "Prolongar la supervivencia en estadios avanzados (III-IV)", "Controlar los sintomas y mantener la calidad de vida"],
      "farmacologico": [
        {"nombre": "Osimertinib", "grupo": "Inhibidor tirosina cinasa EGFR de 3ra generacion", "mecanismo": "Bloquea selectivamente EGFR mutado (ex19del, L858R) y la mutacion de resistencia T790M", "dosis": "80 mg/dia VO en CPCNP con mutacion EGFR; 40 mg si mutacion T790M", "cuidadosEnfermeria": ["Vigilar diarrea, rash y estomatitis", "Monitorizar QTc en ECG mensual (puede prolongarlo)", "Informar sobre teratogenicidad; anticoncepcion obligatoria"]},
        {"nombre": "Pembrolizumab", "grupo": "Anticuerpo monoclonal anti-PD1 (inmunoterapia)", "mecanismo": "Bloquea el checkpoint PD-1/PD-L1, restaurando la actividad de los linfocitos T contra el tumor", "dosis": "200 mg IV cada 3 semanas (CPCNP PD-L1 > 50% sin mutacion tratable)", "cuidadosEnfermeria": ["Infundir en 30 min con filtro", "Vigilar toxicidades inmuno-relacionadas: colitis, neumonitis, hepatitis autoinmune", "Educar al paciente sobre sintomas de toxicidad inmune (diarrea, disnea, ictericia)"]},
        {"nombre": "Carboplatino mas Pemetrexed", "grupo": "Quimioterapia citotoxica de primera linea (CPCNP no escamoso)", "mecanismo": "El carboplatino produce enlaces cruzados en el ADN; el pemetrexed inhibe multiples enzimas del metabolismo del folato", "dosis": "Carboplatino AUC5 IV + Pemetrexed 500 mg/m2 IV cada 21 dias", "cuidadosEnfermeria": ["Premedicacion obligatoria: dexametasona, acido folico y vitamina B12 (con pemetrexed)", "Monitorizar hemograma (mielotoxicidad)", "Hidratar bien por toxicidad renal del carboplatino"]},
        {"nombre": "Morfina (manejo del dolor oncologico)", "grupo": "Analgesico opioide potente", "mecanismo": "Agonista de receptores mu-opioides; primera linea para dolor moderado-severo por cancer", "dosis": "Morfina de liberacion lenta 10-30 mg cada 12h con rescates de 5-10 mg de morfina rapida", "cuidadosEnfermeria": ["Iniciar con dosis bajas y titular segun dolor", "Usar escala analgesica de la OMS (escalera analgesica)", "Prevenir estrenimiento (laxante obligatorio desde el inicio)", "Monitorizar sedacion excesiva y depresion respiratoria"]}
      ],
      "noFarmacologico": ["Cese del tabaquismo (incluso en cancer avanzado mejora la tolerancia al tratamiento)", "Rehabilitacion oncologica", "Soporte nutricional (dietista oncologico)", "Cuidados paliativos desde el diagnostico (no solo al final de vida)", "Soporte psicologico al paciente y familia"],
      "quirurgico": ["Lobectomia con diseccion ganglionar (gold standard en estadios I-II resecables)", "Segmentectomia en pacientes con funcion pulmonar comprometida", "Radioterapia estereotaxica (SBRT) en estadios I no quirurgicos o con riesgo operatorio alto", "Radioterapia o radiocirugia en metastasis cerebrales sintomaticas"]
    },
    "cuidadosEnfermeria": {
      "valoracion": ["Evaluar dolor con escala numerica de 0-10 y caracteristicas", "Monitorizar estado nutricional: peso, albumina, ingesta", "Valorar SpO2 y disnea", "Detectar toxicidades del tratamiento: nauseas, diarrea, rash, mucosite"],
      "intervenciones": ["Administrar quimioterapia o inmunoterapia segun protocolo oncologico", "Manejar efectos adversos: antieméticos previos a quimioterapia, hidratacion", "Cuidado de la via central (PICC o port-a-cath)", "Coordinar con cuidados paliativos para control de sintomas", "Apoyo emocional al paciente y familia"],
      "educacionPaciente": ["Explicar el plan de tratamiento oncologico en terminos comprensibles", "Instruccion sobre signos de toxicidad inmune (con inmunoterapia) y cuando consultar urgente", "Cuidado de boca y piel durante quimioterapia", "Importancia del soporte nutricional", "Recursos de apoyo psicologico y grupos de pacientes"],
      "monitorizacion": ["Hemograma completo antes de cada ciclo de quimioterapia", "Funcion hepatica y renal en cada ciclo", "TC de evaluacion de respuesta cada 2-3 ciclos (criterios RECIST)", "Signos vitales y SpO2 durante la infusion de inmunoterapia"]
    },
    "npiNanda": [
      {"codigo": "00132", "nombre": "Dolor agudo y cronico", "definicion": "Experiencia sensitiva desagradable asociada con cancer y su tratamiento", "caracteristicasDefinitorias": ["Dolor toracico", "Dolor oseo en metastasis", "Cefalea en metastasis cerebrales"], "factoresRelacionados": ["Invasion tumoral", "Metastasis oseas o cerebrales", "Procedimientos diagnosticos invasivos"]},
      {"codigo": "00002", "nombre": "Desequilibrio nutricional: ingesta inferior a las necesidades", "definicion": "Ingesta insuficiente de nutrientes para satisfacer necesidades metabolicas", "caracteristicasDefinitorias": ["Perdida de peso > 5%", "Anorexia", "Nauseas por quimioterapia"], "factoresRelacionados": ["Caquexia cancerosa", "Toxicidad digestiva del tratamiento"]},
      {"codigo": "00148", "nombre": "Temor", "definicion": "Respuesta a una amenaza percibida como consciente y reconocida", "caracteristicasDefinitorias": ["Expresion de miedo a la muerte", "Preocupacion por la familia", "Dificultad para tomar decisiones"], "factoresRelacionados": ["Diagnostico de cancer con pronostico reservado", "Incertidumbre sobre el futuro"]}
    ],
    "npiNic": [
      {"codigo": "1400", "nombre": "Manejo del dolor", "actividades": ["Evaluar dolor con escala numerica cada 4-8h", "Administrar opioides segun prescripcion y necesidad", "Prevenir estrenimiento con laxantes desde el inicio de opioides", "Ajustar dosis ante dolor mal controlado"]},
      {"codigo": "1160", "nombre": "Monitorizacion nutricional", "actividades": ["Pesar semanalmente", "Registrar ingesta diaria de alimentos", "Coordinar con dietista para suplementacion nutricional", "Considerar nutricion enteral si ingesta < 50%"]},
      {"codigo": "5270", "nombre": "Apoyo emocional", "actividades": ["Escuchar activamente las preocupaciones del paciente", "Involucrar a la familia con consentimiento del paciente", "Coordinar atencion con psicologo oncologico"]}
    ],
    "npiNoc": [
      {"codigo": "2102", "nombre": "Nivel del dolor", "indicadores": ["Dolor < 4/10 en la mayoria de las horas del dia", "Duerme sin que el dolor lo despierte", "Puede realizar actividades basicas"], "escala": "1=Grave, 5=Ningun"},
      {"codigo": "1004", "nombre": "Estado nutricional", "indicadores": ["Peso estable o sin descenso mayor a 2% mensual", "Albumina > 3 g/dL", "Ingesta superior al 75% de lo recomendado"], "escala": "1=Desviacion grave, 5=Sin desviacion"}
    ],
    "complicaciones": ["Sindrome de vena cava superior", "Hemoptisis masiva", "Metastasis cerebrales con hipertension intracraneal", "Metastasis oseas con fractura patologica", "Derrame pericardico maligno con taponamiento", "Sindrome de lisis tumoral con quimioterapia"],
    "criteriosAlarma": ["Hemoptisis masiva (> 200 mL)", "Sindrome de vena cava superior con estridor", "Signos de metastasis cerebral: convulsiones, paresia", "Dolor oseo agudo intenso (fractura patologica)", "Disnea severa brusca (atelectasia masiva, derrame pericardico, embolia)"],
    "emergencyLevel": "critico",
    "relatedPathologyIds": ["pat_epoc", "pat_derrame_pleural"],
    "isPremium": True
  }
]

with open('F:/programas/Patologias/src/data/pathologies.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

data.extend(new_pathologies)

with open('F:/programas/Patologias/src/data/pathologies.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f'Done. Total pathologies: {len(data)}')
