import json

new_pathologies = [
  # ===== ENDOCRINO =====
  {
    "id": "pat_cushing",
    "nombre": "Sindrome de Cushing",
    "bodySystemId": "endocrino",
    "definicion": "Conjunto de signos y sintomas producidos por la exposicion prolongada y excesiva al cortisol, ya sea de origen exogeno (uso cronico de corticoides) o endogeno (hipercortisolismo ACTH-dependiente o independiente).",
    "epidemiologia": "El Cushing endogeno tiene una incidencia de 2-3 casos por millon/ano. La causa mas frecuente del endogeno es la enfermedad de Cushing (adenoma hipofisario productor de ACTH, 70%). El Cushing exogeno (iatrogeno) es mucho mas frecuente por el uso generalizado de corticoides.",
    "factoresRiesgo": ["Uso cronico de corticoides sistemicos (causa mas frecuente global)", "Adenoma hipofisario productor de ACTH (enfermedad de Cushing)", "Tumor suprarrenal (adenoma o carcinoma adrenocortical)", "Produccion ectopica de ACTH (carcinoma pulmonar de celulas pequenas, carcinoide)"],
    "fisiopatologia": "El exceso de cortisol produce efectos catabólicos: movilizacion de proteinas musculares y oseas, redistribucion central de la grasa (visceral, facial, interescapular), hiperglucemia por resistencia a la insulina. El cortisol actua como mineralocorticoide en exceso produciendo hipertension arterial e hipopotasemia. La supresion del eje hipotalamo-hipofisario-suprarrenal produce atrofia suprarrenal bilateral en el Cushing exogeno.",
    "signosYSintomas": {
      "signos": ["Obesity central con redistribucion facial: cara de luna llena", "Joroba dorsal (giba de bisonte) por acumulacion de grasa interescapular", "Estrias violaceas anchas (> 1 cm) en abdomen y muslos", "Atrofia muscular proximal (debilidad para levantarse de una silla)", "Hirsutismo y acne en mujeres", "Pletora facial", "Hematomas faciles con minimos traumatismos", "HTA en el 80%"],
      "sintomas": ["Aumento de peso con preferencia central", "Debilidad muscular proximal severa", "Cambios del animo: depresion, labilidad emocional, insomnio", "Oligomenorrea o amenorrea", "Polidipsia y poliuria en diabetes corticoidea", "Cefalea", "Disfuncion sexual"]
    },
    "clasificacion": {
      "nombre": "Clasificacion por origen del hipercortisolismo",
      "tipos": [
        {"nombre": "Cushing exogeno (iatrogeno)", "descripcion": "Por administracion cronica de corticoides; ACTH suprimida"},
        {"nombre": "Enfermedad de Cushing", "descripcion": "Adenoma hipofisario productor de ACTH (70% del Cushing endogeno); ACTH elevada"},
        {"nombre": "Tumor suprarrenal", "descripcion": "Adenoma o carcinoma adrenocortical productor de cortisol; ACTH suprimida"},
        {"nombre": "Cushing ectopico", "descripcion": "Produccion de ACTH por tumor no hipofisario (pulmon, pancreas); ACTH muy elevada; hipopotasemia severa"}
      ]
    },
    "diagnostico": {
      "anamnesis": ["Historia detallada de uso de corticoides (via y dosis)", "Tiempo de evolucion de los sintomas caracteristicos", "Antecedentes familiares de tumores endocrinos (NEM1)", "Sintomas de compresion tumoral: cefalea, alteraciones visuales (adenoma hipofisario)"],
      "examenFisico": ["Peso, talla, IMC, PA", "Inspeccion: redistribucion grasa, estrias, hematomas, atrofia muscular", "Fuerza proximal: prueba de levantarse de la silla sin apoyar los brazos", "Campos visuales: hemianopsia bitemporal en macroadenoma hipofisario"],
      "pruebas": [
        {"nombre": "Cortisol libre en orina de 24h", "descripcion": "Primer screening: mide la excrecion total de cortisol libre en 24h; positivo si > 3-4 veces el limite superior normal en dos muestras", "valoresReferencia": "Normal < 50 mcg/24h (varia segun laboratorio)", "cuidadosEnfermeria": ["Instruccion detallada para la recoleccion correcta de orina de 24h", "Conservar en recipiente de acido o refrigerado segun laboratorio", "Descartar la primera miccion del dia"]},
        {"nombre": "Test de supresion con dexametasona 1 mg (nocturno)", "descripcion": "Screening: 1 mg de dexametasona oral a las 23h; cortisol plasmatico a las 8h; falta de supresion < 1.8 mcg/dL es positivo", "valoresReferencia": "Cortisol post-dexametasona > 1.8 mcg/dL = test positivo (hipercortisolismo)", "cuidadosEnfermeria": ["Asegurarse de que el paciente tome el comprimido de dexametasona exactamente a las 23h", "Extraer la muestra de cortisol a las 8-9h del dia siguiente en ayunas", "Registrar si el paciente tomo farmacos que alteran el metabolismo de la dexametasona"]},
        {"nombre": "ACTH plasmatica basale", "descripcion": "Diferencia el Cushing ACTH-dependiente (elevado: hipofisario o ectopico) del independiente (suprimido: suprarrenal)", "valoresReferencia": "Normal 10-50 pg/mL; < 5 sugiere origen suprarrenal; > 100 sugiere ectopico", "cuidadosEnfermeria": ["Extraer muestra en EDTA en hielo", "Enviar urgente al laboratorio en hielo (la ACTH es inestable)", "Extraer a las 8-9h (pico circadiano)"]},
        {"nombre": "RMN hipofisaria con gadolinio", "descripcion": "Detecta adenoma hipofisario en enfermedad de Cushing; puede ser microadenoma < 6 mm (50% de los casos)", "valoresReferencia": "Lesion hipointensa en T1 con realce tardio o ausente de gadolinio", "cuidadosEnfermeria": ["Verificar contraindicaciones para gadolinio: funcion renal, marcapasos", "Informar sobre la duracion del estudio (30-45 min)"]}
      ]
    },
    "tratamientoMedico": {
      "objetivos": ["Normalizar el cortisol y sus efectos sistemicos", "Tratar la causa subyacente", "Prevenir y tratar complicaciones (DM, osteoporosis, infecciones, HTA)"],
      "farmacologico": [
        {"nombre": "Ketoconazol", "grupo": "Inhibidor de la esteroidogenesis suprarrenal", "mecanismo": "Inhibe multiples enzimas del paso de colesterol a cortisol en la suprarrenal; tratamiento medico de segunda linea o preoperatorio", "dosis": "200-400 mg cada 8-12h, titulando por niveles de cortisol", "cuidadosEnfermeria": ["Hepatotoxicidad: control de transaminasas mensual", "Vigilar insuficiencia suprarrenal: nauseas, hipotension, hipoglucemia", "Puede interaccionar con muchos farmacos (inhibidor potente de CYP3A4)"]},
        {"nombre": "Metirapona", "grupo": "Inhibidor de la 11-beta-hidroxilasa", "mecanismo": "Bloquea el paso final de la sintesis de cortisol; alternativa al ketoconazol; rapido inicio de accion", "dosis": "500-6000 mg/dia en 3-4 tomas", "cuidadosEnfermeria": ["Monitorizar cortisol y ACTH periodicamente para ajustar dosis", "Vigilar exceso de androgenos (hirsutismo, acne) y mineralocorticoides (edemas, hipertension, hipopotasemia)", "Puede empeorar la hipertension en algunos pacientes"]},
        {"nombre": "Hidrocortisona (reemplazo post-cirugia)", "grupo": "Corticosteroide de reemplazo", "mecanismo": "Sustituye el cortisol endogeno tras la suprarrenalectomia o la hipofisectomia; la suprarrenal atrofiada no produce cortisol en los primeros meses", "dosis": "15-25 mg/dia en 2-3 tomas: mayor dosis matutina (simulando el perfil circadiano)", "cuidadosEnfermeria": ["Educar sobre la necesidad de aumentar la dosis en situaciones de estres (regla del doble o triple)", "Ensenyar signos de crisis suprarrenal: hipotension, hipoglucemia, vomitos", "El paciente debe llevar siempre tarjeta de identificacion de tratamiento corticoide"]}
      ],
      "noFarmacologico": ["Control estricto de PA, glucemia y densidad mineral osea", "Calcio 1000-1200 mg/dia y vitamina D 800 UI/dia para osteoporosis corticoidea", "Actividad fisica para combatir la atrofia muscular y la obesidad", "Apoyo psicologico por la afectacion del animo y la imagen corporal"],
      "quirurgico": ["Adenomectomia transesfenoidal (cirugia de primera eleccion en enfermedad de Cushing: curacion 70-90%)", "Suprarrenalectomia unilateral en adenoma suprarrenal", "Suprarrenalectomia bilateral en Cushing suprarrenal bilateral o ectopico sin tumor localizable", "Radioterapia hipofisaria si falla la cirugia"]
    },
    "cuidadosEnfermeria": {
      "valoracion": ["Monitorizar PA en cada turno (HTA severa frecuente)", "Controlar glucemia en ayunas y postprandial (diabetes corticoidea)", "Evaluar fuerza muscular proximal: levantarse de la silla", "Evaluar integridad cutanea: estrias, hematomas, heridas que no cicatrizan"],
      "intervenciones": ["Administrar antihipertensivos e hipoglucemiantes segun indicacion", "Cuidado especial de la piel (fragilidad cutanea por cortisol)", "Prevencion de caidas por debilidad muscular y osteoporosis", "Soporte emocional por cambios en la imagen corporal y alteraciones del animo", "Educacion sobre el tratamiento de reemplazo post-cirugia"],
      "educacionPaciente": ["Explicar que la reduccion del cortisol tarda semanas en producir mejoria de los sintomas", "Instruccion sobre la regla del doble o triple de hidrocortisona en situaciones de estres fisico", "Siempre llevar tarjeta de alerta medica: paciente con insuficiencia suprarrenal en tratamiento", "Cuando consultar urgencias: vomitos con incapacidad de tomar la medicacion oral, hipotension, fiebre alta"],
      "monitorizacion": ["PA cada 8h", "Glucemia ayunas y 2h post-prandial", "Cortisol libre en orina para seguimiento de la respuesta al tratamiento", "Densitometria osea (DEXA) al diagnostico y anual"]
    },
    "npiNanda": [
      {"codigo": "00069", "nombre": "Afrontamiento ineficaz", "definicion": "Incapacidad para formular una apreciacion valida de los agentes estresantes", "caracteristicasDefinitorias": ["Cambios en la imagen corporal", "Labilidad emocional", "Depresion"], "factoresRelacionados": ["Alteracion de la imagen corporal por hipercortisolismo", "Efectos del cortisol sobre el sistema limbico"]},
      {"codigo": "00029", "nombre": "Disminucion del gasto cardiaco", "definicion": "Gasto cardiaco insuficiente", "caracteristicasDefinitorias": ["Hipertension arterial severa"], "factoresRelacionados": ["Efecto mineralocorticoide del cortisol en exceso"]},
      {"codigo": "00047", "nombre": "Riesgo de deterioro de la integridad cutanea", "definicion": "Riesgo de alteracion de la piel", "caracteristicasDefinitorias": ["Fragilidad cutanea", "Estrias", "Hematomas espontaneos"], "factoresRelacionados": ["Efecto catabolico del cortisol sobre el colageno dermico"]}
    ],
    "npiNic": [
      {"codigo": "2080", "nombre": "Manejo del trastorno endocrino", "actividades": ["Controlar glucemia y PA periodicamente", "Administrar farmacos que reducen el cortisol segun prescripcion", "Monitorizar transaminasas con ketoconazol"]},
      {"codigo": "3590", "nombre": "Vigilancia de la piel", "actividades": ["Inspeccionar la piel diariamente en busca de hematomas y heridas", "Usar apósitos atraumaticos al retirar", "Evitar venopunciones innecesarias en pacientes con piel muy fragil"]},
      {"codigo": "5270", "nombre": "Apoyo emocional", "actividades": ["Escuchar las preocupaciones sobre cambios en la imagen corporal", "Explicar que los cambios fisicos son reversibles con el tratamiento", "Derivar a psicologo si hay depresion significativa"]}
    ],
    "npiNoc": [
      {"codigo": "0800", "nombre": "Termicidad y metabolismo", "indicadores": ["Glucemia en objetivo", "PA en objetivo < 130/80 mmHg", "Cortisol libre en descenso"], "escala": "1=Desviacion grave, 5=Sin desviacion"},
      {"codigo": "1200", "nombre": "Imagen corporal", "indicadores": ["Acepta los cambios fisicos como temporales", "Mantiene las relaciones sociales", "Expresa adaptacion positiva"], "escala": "1=Nunca positiva, 5=Constantemente positiva"}
    ],
    "complicaciones": ["Diabetes mellitus corticoidea", "Osteoporosis con fracturas por fragilidad", "Infecciones oportunistas (Pneumocystis, aspergillus)", "Trombosis venosa profunda y embolia pulmonar", "Insuficiencia suprarrenal aguda post-cirugia"],
    "criteriosAlarma": ["Hipotension + nauseas + hipoglucemia post-cirugia (crisis suprarrenal: corticoide IV urgente)", "Fractura vertebral o de cadera (osteoporosis)", "Infeccion grave de curso atipico (inmunosupresion por cortisol)", "Deterioro brusco del nivel de consciencia"],
    "emergencyLevel": "moderado",
    "relatedPathologyIds": ["pat_hta", "pat_dm2"],
    "isPremium": True
  },
  {
    "id": "pat_feocromocitoma",
    "nombre": "Feocromocitoma",
    "bodySystemId": "endocrino",
    "definicion": "Tumor neuroendocrino que se origina en las celulas cromafines de la medula suprarrenal (feocromocitoma) o en los ganglios simpaticos extraadrenales (paraganglioma), con capacidad de secretar catecolaminas (adrenalina, noradrenalina, dopamina) produciendo una constelacion de sintomas cardiovasculares graves.",
    "epidemiologia": "Incidencia de 2-8 casos por millon/ano. El 10% es bilateral, el 10% es maligno, el 10% es extraadrenal (regla del 10%). El 30-40% es hereditario (mutaciones VHL, RET, NF1, SDHB). Es una causa tratable de hipertension arterial secundaria.",
    "factoresRiesgo": ["Neoplasia endocrina multiple tipo 2 (NEM2): mutacion RET", "Enfermedad de Von Hippel-Lindau: mutacion VHL", "Neurofibromatosis tipo 1: mutacion NF1", "Sindrome de paraganglioma familiar: mutaciones SDH"],
    "fisiopatologia": "La liberacion episodica o continua de catecolaminas produce activacion excesiva de los receptores adrenergicos alfa (vasoconstriccion, HTA, midriasis) y beta (taquicardia, arritmias, sudoracion). La estimulacion alfa produce vasoconstriccion periferica intensa con HTA paroxistica. La elevacion de catecolaminas puede producir miocardiopatia de estres (Takotsubo) e incluso hemorragia cerebral.",
    "signosYSintomas": {
      "signos": ["Hipertension arterial severa: paroxistica (50%) o sostenida (50%)", "Hipertension resistente a multiples farmacos", "Taquicardia o arritmias durante las crisis", "Palidez cutanea durante las crisis (vasoconstriccion alfa)", "Midriasis durante las crisis"],
      "sintomas": ["Triada clasica: cefalea severa + sudoracion profusa + palpitaciones (especificidad 90%)", "HTA paroxistica con inicio y fin bruscos (minutos a horas)", "Ansiedad intensa o sensacion de muerte inminente durante la crisis", "Palidez o rubor alternantes", "Dolor precordial", "Temblor de manos"]
    },
    "clasificacion": {
      "nombre": "Clasificacion por localizacion",
      "tipos": [
        {"nombre": "Feocromocitoma adrenal unilateral", "descripcion": "Medula suprarrenal; 90% de los casos; 10% bilateral; suprarrenalectomia laparoscopica"},
        {"nombre": "Paraganglioma extraadrenal", "descripcion": "Ganglios simpaticos paravertebrales, organo de Zuckerkandl; 10% de los casos; mayor riesgo de malignidad"},
        {"nombre": "Maligno (metastatico)", "descripcion": "10% de los feocromocitomas; metastasis en hueso, higado, pulmon; asociado a mutaciones SDHB"}
      ]
    },
    "diagnostico": {
      "anamnesis": ["Triada: cefalea + sudoracion + palpitaciones (especialmente paroxistica con HTA severa)", "Historia familiar de feocromocitoma u otras neoplasias endocrinas", "Factores desencadenantes de las crisis: ejercicio, maniobras de Valsalva, anestesia, ciertos farmacos (opioides, metoclopramida)", "Antecedente de HTA resistente o crisis hipertensivas graves"],
      "examenFisico": ["Medicion de PA en crisis y en reposo", "Evaluacion cardiologica (arritmias, miocardiopatia)", "Examen de abdomen: masa palpable en tumor grande", "Busqueda de estigmas de sindromes hereditarios: manchas cafe con leche, hemangioblastomas oculares"],
      "pruebas": [
        {"nombre": "Metanefrinas fraccionadas en plasma o en orina de 24h", "descripcion": "Test bioquimico de eleccion: las metanefrinas son metabolitos estables de las catecolaminas con alta sensibilidad", "valoresReferencia": "Metanefrina plasmatica > 0.5 nmol/L o normetanefrina > 1 nmol/L = altamente sugestivo", "cuidadosEnfermeria": ["Orina de 24h: conservar con HCl en recipiente especial y refrigerado", "Para plasma: extraer en decubito supino tras 30 min de reposo", "Evitar farmacos que interfieren: antidepresivos, levodopa, labetalol 48-72h antes"]},
        {"nombre": "TC o RMN de abdomen y pelvis", "descripcion": "Localiza el tumor tras confirmacion bioquimica; la RMN es de eleccion en tumores extraadrenales o hereditarios", "valoresReferencia": "Feocromocitoma: masa adrenal > 3 cm con alta captacion en T2 en RMN", "cuidadosEnfermeria": ["Verificar funcion renal para contraste yodado (TC)", "Informar sobre duracion del estudio", "El paciente DEBE estar bloqueado alfa antes del TC con contraste (contaste puede desencadenar crisis)"]},
        {"nombre": "Gammagrafia con MIBG (metayodobencilguanidina)", "descripcion": "Localiza feocromocitoma/paraganglioma con alta especificidad; util en tumores multiples o enfermedad metastatica", "valoresReferencia": "Captacion positiva en el tumor confirma la naturaleza cromafin", "cuidadosEnfermeria": ["Bloqueo tiroideo previo con yodo lugol o perclorato para proteger la tiroides del I-131", "Verificar que el paciente no tome farmacos que interfieren con la captacion de MIBG: labetalol, antidepresivos triciclicos, calcioantagonistas"]}
      ]
    },
    "tratamientoMedico": {
      "objetivos": ["Bloqueo farmacologico completo antes de la cirugia para prevenir crisis hipertensiva intraoperatoria", "Cirugia curativa (suprarrenalectomia laparoscopica)", "Vigilancia genetica y seguimiento a largo plazo"],
      "farmacologico": [
        {"nombre": "Fenoxibenzamina", "grupo": "Bloqueante alfa-adrenergico no selectivo irreversible", "mecanismo": "Bloqueo alfa permanente que previene la vasoconstriccion catecolaminica; preparacion preoperatoria obligatoria durante 10-14 dias", "dosis": "10 mg cada 12h aumentando cada 2-3 dias hasta alcanzar el bloqueo (PA < 130/80, hipotension ortostática leve)", "cuidadosEnfermeria": ["Monitorizar PA en bipedestacion: hipotension ortostática es signo de bloqueo correcto", "Advertir al paciente sobre hipotension al levantarse: levantarse despacio", "El paciente puede requerir expansion de volumen (hidratacion generosa) por vasodilatacion"]},
        {"nombre": "Doxazosina", "grupo": "Bloqueante alfa-1 selectivo", "mecanismo": "Alternativa a la fenoxibenzamina; mas selectivo y mejor tolerado; usado en la preparacion preoperatoria", "dosis": "2-16 mg/dia en 1-2 tomas", "cuidadosEnfermeria": ["Iniciar con dosis baja (2 mg) y titular", "Primera dosis en la noche para reducir hipotension ortostática", "Monitorizar PA en cada turno durante la titulacion"]},
        {"nombre": "Propranolol (SOLO tras el bloqueo alfa)", "grupo": "Betabloqueante no selectivo", "mecanismo": "Controla la taquicardia y las arritmias tras el bloqueo alfa; NUNCA iniciar sin alfa-bloqueante previo", "dosis": "20-40 mg cada 8h, inicio solo tras 3-7 dias de bloqueo alfa completo", "cuidadosEnfermeria": ["CONTRAINDICADO como primer farmaco: puede producir crisis hipertensiva paradojica por bloqueo beta con alfa libre", "Iniciar solo cuando el bloqueo alfa este establecido", "Vigilar broncoespasmo en asmaticos"]}
      ],
      "noFarmacologico": ["Dieta rica en sodio y alta ingesta de liquidos durante el bloqueo alfa (compensa la vasodilatacion)", "Evitar factores desencadenantes de crisis: esfuerzo fisico, maniobras de Valsalva, ciertos farmacos", "Screening genetico y de la familia en casos hereditarios"],
      "quirurgico": ["Suprarrenalectomia laparoscopica (primera eleccion en feocromocitoma adrenal unilateral)", "Cirugia abierta en tumores grandes > 6-8 cm o con invasion local", "Radioembolizacion o MIBG terapeutico en enfermedad metastatica"]
    },
    "cuidadosEnfermeria": {
      "valoracion": ["Monitorizar PA de forma continua o cada 30-60 min en preparacion preoperatoria", "Evaluar la PA en bipedestacion (hipotension ortostática deseada como signo de bloqueo alfa eficaz)", "Registrar los episodios de crisis: inicio, duracion, PA, sintomas", "Monitorizar FC y ritmo cardiaco: taquicardia y arritmias"],
      "intervenciones": ["Administrar alfa-bloqueantes segun horario exacto para mantener el bloqueo continuo", "Mantener acceso venoso de gran calibre por riesgo de crisis intraoperatoria", "Evitar cualquier medicacion que pueda desencadenar una crisis (metoclopramida, droperidol, morfina IV rapida)", "Preparar nitroprusato sodico o nicardipino IV para crisis hipertensiva perioperatoria", "En crisis hipertensiva: nitroprusato IV o phentolamine IV inmediatos"],
      "educacionPaciente": ["Explicar la importancia del bloqueo alfa preoperatorio: sin el, la cirugia es de muy alto riesgo", "Educar sobre el reconocimiento de las crisis", "Instruir para evitar desencadenantes", "En casos hereditarios: importancia del seguimiento genetico de la familia"],
      "monitorizacion": ["PA continua o cada 30 min en perioperatorio", "ECG continuo en la induccion anestesica y la cirugia", "PA postoperatoria: hipotension frecuente tras extirpacion del tumor", "Glucemia: hipoglucemia reactiva post-tumor por rebote insulinico"]
    },
    "npiNanda": [
      {"codigo": "00233", "nombre": "Riesgo de presion arterial inestable", "definicion": "Riesgo de cambios en las fuerzas de la sangre que pueden comprometer la salud", "caracteristicasDefinitorias": ["Episodios de HTA paroxistica severa", "Variabilidad de PA entre crisis"], "factoresRelacionados": ["Secrecion episodica de catecolaminas por el tumor"]},
      {"codigo": "00146", "nombre": "Ansiedad", "definicion": "Vaga sensacion de malestar o amenaza con respuesta autonoma", "caracteristicasDefinitorias": ["Ansiedad durante las crisis", "Sensacion de muerte inminente"], "factoresRelacionados": ["Liberacion masiva de adrenalina y noradrenalina"]},
      {"codigo": "00004", "nombre": "Riesgo de infeccion", "definicion": "Riesgo de infeccion postquirurgica", "caracteristicasDefinitorias": ["Intervencion quirurgica suprarrenal"], "factoresRelacionados": ["Suprarrenalectomia laparoscopica"]}
    ],
    "npiNic": [
      {"codigo": "4162", "nombre": "Manejo de la hipertension", "actividades": ["Monitorizar PA continua en preparacion preoperatoria", "Administrar alfa-bloqueantes segun horario", "Tener farmacos de rescate IV preparados (nitroprusato)", "Instruir al paciente en reconocimiento de crisis"]},
      {"codigo": "4040", "nombre": "Cuidados cardiacos", "actividades": ["Monitorizar ECG continuo en perioperatorio", "Detectar taquicardia y arritmias", "Administrar betabloqueantes solo tras alfa-bloqueo establecido"]},
      {"codigo": "5820", "nombre": "Disminucion de la ansiedad", "actividades": ["Explicar que las crisis son producto del tumor y son tratables", "Ensenyar tecnicas de relajacion durante las crisis leves", "Asegurar que el equipo esta preparado para manejar una crisis"]}
    ],
    "npiNoc": [
      {"codigo": "0401", "nombre": "Estado circulatorio", "indicadores": ["PA < 130/80 mmHg en reposo con alfa-bloqueante", "FC < 90 lpm", "Sin episodios de crisis hipertensiva en el postoperatorio"], "escala": "1=Desviacion grave, 5=Sin desviacion"},
      {"codigo": "1302", "nombre": "Afrontamiento de problemas", "indicadores": ["Adhiere al bloqueo alfa preoperatorio", "Evita los desencadenantes conocidos", "Consulta precozmente en episodios de crisis"], "escala": "1=Nunca demostrado, 5=Constantemente demostrado"}
    ],
    "complicaciones": ["Crisis hipertensiva intraoperatoria (mortal sin bloqueo alfa previo)", "Miocardiopatia de estres (Takotsubo) inducida por catecolaminas", "Hemorragia o infarto cerebral durante la crisis", "Hipotension postoperatoria severa", "Recurrencia o malignizacion en casos hereditarios"],
    "criteriosAlarma": ["Crisis hipertensiva PA > 200/120 mmHg con cefalea severa y sudoracion profusa", "Arritmia ventricular maligna en el contexto de una crisis", "Dolor toracico con cambios isquemicos en ECG (miocardiopatia de estres)", "Hemorragia intratumoral espontanea"],
    "emergencyLevel": "critico",
    "relatedPathologyIds": ["pat_hta"],
    "isPremium": True
  },
  {
    "id": "pat_hipopituitarismo",
    "nombre": "Hipopituitarismo",
    "bodySystemId": "endocrino",
    "definicion": "Deficiencia de una o mas hormonas de la hipofisis anterior (GH, LH, FSH, TSH, ACTH, PRL) o posterior (ADH, oxitocina), que produce insuficiencia de las glandulas diana perifericas y sus consecuencias clinicas.",
    "epidemiologia": "Prevalencia de 45 casos por 100.000 habitantes. La causa mas frecuente en adultos es el adenoma hipofisario (con o sin cirugia previa). La deficiencia de ACTH es la mas peligrosa por riesgo de crisis suprarrenal.",
    "factoresRiesgo": ["Adenoma hipofisario (macro o microadenoma; causa mas frecuente en adultos)", "Cirugia hipofisaria o radioterapia craneal", "Traumatismo craneoencefalico grave", "Sindrome de Sheehan (necrosis hipofisaria postparto por hemorragia)", "Craneofaringioma (causa mas frecuente en ninos)", "Infiltracion por sarcoidosis, histiocitosis, hemocromatosis", "Apoplejia hipofisaria (infarto o hemorragia en un adenoma)"],
    "fisiopatologia": "La hipofisis anterior produce hormonas tropoicas bajo control hipotalamica. La lesion o la compresion de las celulas hipofisarias produce deficiencias hormonales en un orden tipico de aparicion: GH y FSH/LH se pierden primero (90%); TSH y ACTH mas tarde (60-80%); PRL y ADH raramente se pierden en el hipopituitarismo parcial. La deficiencia de ACTH produce insuficiencia suprarrenal secundaria (sin hiperpigmentacion ni hiperaldosteronismo a diferencia de la primaria).",
    "signosYSintomas": {
      "signos": ["Palidez cutanea (deficiencia de MSH por ACTH baja)", "Perdida de vello pubico y axilar (deficiencia de FSH/LH)", "Atrofia testicular u oovarica", "Hipotension arterial (insuficiencia suprarrenal secundaria)", "Bradicardia y piel seca (hipotiroidismo secundario)", "Galactorrea si hay lesion del tallo hipofisario (PRL elevada paradojicamente)"],
      "sintomas": ["Fatiga severa y debilidad (insuficiencia suprarrenal secundaria)", "Intolerancia al frio y estrenimineto (hipotiroidismo secundario)", "Perdida de la libido e impotencia o amenorrea (deficiencia de LH/FSH)", "Retardo del crecimiento en ninos (deficiencia de GH)", "Poliuria y polidipsia si hay deficiencia de ADH (diabetes insipida)", "Cefalea y alteraciones visuales en adenoma hipofisario"]
    },
    "clasificacion": {
      "nombre": "Clasificacion por deficiencias hormonales",
      "tipos": [
        {"nombre": "Panhipopituitarismo", "descripcion": "Deficiencia de todas las hormonas hipofisarias anteriores; por lo general por lesion extensa"},
        {"nombre": "Hipopituitarismo parcial", "descripcion": "Deficiencia de 1-2 ejes; mas frecuente; GH y gonadotropinas se pierden primero"},
        {"nombre": "Insuficiencia suprarrenal secundaria", "descripcion": "Deficiencia de ACTH aislada o en hipopituitarismo; sin hiperpigmentacion; la mas peligrosa"},
        {"nombre": "Hipotiroidismo central", "descripcion": "Deficiencia de TSH; TSH normal o baja con T4 libre baja; no se diagnostica solo con TSH"}
      ]
    },
    "diagnostico": {
      "anamnesis": ["Historia de cirugia hipofisaria, radioterapia craneal o TCC grave", "Parto complicado con hemorragia (Sheehan)", "Sintomas de deficiencias hormonales especificas", "Cefalea o alteraciones visuales (tumor hipofisario)"],
      "examenFisico": ["Evaluacion de caracteres sexuales secundarios", "Inspeccion de la piel: palidez, vello pubico y axilar", "Campos visuales por confrontacion (hemianopsia bitemporal)", "PA y FC: hipotension en insuficiencia suprarrenal"],
      "pruebas": [
        {"nombre": "Perfil hormonal basal completo", "descripcion": "TSH + T4 libre; LH + FSH + Estradiol (mujeres) o Testosterona (hombres); ACTH + Cortisol basal; IGF-1 (marcador de GH); Prolactina", "valoresReferencia": "Cortisol basal < 3 mcg/dL = insuficiencia suprarrenal probable; TSH baja con T4 libre baja = hipotiroidismo central", "cuidadosEnfermeria": ["Extraer a las 8-9h de la manana (cortisol y ACTH son pico circadiano)", "Muestra de ACTH en hielo urgente al laboratorio", "Registrar tratamientos corticoideos previos que alteran los resultados"]},
        {"nombre": "Test de estimulacion con glucagon o hipoglucemia insulinica", "descripcion": "Confirma la reserva de GH y de ACTH; el cortisol debe subir > 18 mcg/dL ante el estres hipoglucemico", "valoresReferencia": "Cortisol pico > 18 mcg/dL descarta insuficiencia suprarrenal; GH pico > 3 mcg/L descarta deficiencia", "cuidadosEnfermeria": ["Via venosa permeable y medico presente durante todo el test", "Monitorizar glucemia cada 15 min (hipoglucemia de 40 mg/dL es el objetivo)", "Tener glucosa al 33% y glucagon disponibles para revertir la hipoglucemia"]},
        {"nombre": "RMN hipofisaria con gadolinio", "descripcion": "Define la anatomia hipofisaria, detecta adenomas, sellavacia, inflamacion o compresion del tallo", "valoresReferencia": "Sella turcica vacia (empty sella) en formas cronicas; adenoma hipofisario como masa con efecto de masa", "cuidadosEnfermeria": ["Verificar contraindicaciones para gadolinio", "Informar sobre duracion del estudio"]}
      ]
    },
    "tratamientoMedico": {
      "objetivos": ["Reemplazar las hormonas deficientes con hormonas exogenas", "Tratar la causa subyacente (adenoma: cirugia o radioterapia)", "Prevenir la crisis suprarrenal aguda (la complicacion mas grave)"],
      "farmacologico": [
        {"nombre": "Hidrocortisona (reemplazo de ACTH)", "grupo": "Corticosteroide de reemplazo fisiologico", "mecanismo": "Sustituye el cortisol endogeno en la insuficiencia suprarrenal secundaria; dosis mas baja que en la primaria", "dosis": "15-25 mg/dia: mayor dosis en la manana, menor al mediodia, no dar por la noche", "cuidadosEnfermeria": ["Educar sobre la regla del doble o triple en situaciones de estres fisico", "Siempre llevar tarjeta de alerta medica e inyectable de emergencia (hidrocortisona 100 mg IM)", "La insuficiencia suprarrenal nunca debe ser la ultima deficiencia en diagnosticarse o la primera en dejar de tratarse"]},
        {"nombre": "Levotiroxina (reemplazo de TSH)", "grupo": "Hormona tiroidea sintetica", "mecanismo": "Sustituye T4; en hipopituitarismo, la TSH no es valida para monitorizar la dosis; usar T4 libre como guia", "dosis": "1.6 mcg/kg/dia; ajustar por T4 libre (objetivo: tercio superior del rango normal)", "cuidadosEnfermeria": ["NUNCA iniciar levotiroxina antes de haber reemplazado el cortisol (puede precipitar crisis suprarrenal)", "Monitorizar T4 libre (no TSH) en hipopituitarismo", "Administrar en ayunas 30 min antes del desayuno"]},
        {"nombre": "Testosterona (reemplazo de LH/FSH en hombres)", "grupo": "Androgeno de reemplazo", "mecanismo": "Sustituye la testosterona en el hipogonadismo hipogonadotropo masculino", "dosis": "Testosterona depot 250 mg IM cada 3-4 semanas o testosterona transdérmica 50 mg/dia", "cuidadosEnfermeria": ["Monitorizar testosterona plasmatica (objetivo rango normal medio)", "Controlar hematocrito: la testosterona puede producir poliglobulia", "PSA anual en hombres > 45 anos (contraindicada en cancer de prostata activo)"]}
      ],
      "noFarmacologico": ["Seguimiento endocrinologico especializado cada 6-12 meses", "En mujeres en edad fertil: tratamiento de la infertilidad con gonadotropinas exogenas", "Educacion intensa sobre la crisis suprarrenal: como prevenirla y tratarla"],
      "quirurgico": ["Adenomectomia transesfenoidal si hay adenoma hipofisario causal (restaura parcialmente la funcion en algunos casos)"]
    },
    "cuidadosEnfermeria": {
      "valoracion": ["Monitorizar PA y FC: la hipotension puede indicar insuficiencia suprarrenal no reemplazada", "Evaluar nivel de consciencia: la confusion puede indicar crisis suprarrenal o hipoglucemia", "Registrar temperatura: hipotermia en hipotiroidismo central grave", "Valorar el nivel de fatiga y la capacidad funcional"],
      "intervenciones": ["Administrar hidrocortisona exactamente en el horario prescrito", "En situaciones de estres (cirugia, fiebre > 38.5, vomitos): aplicar la regla del doble y comunicar al medico", "En crisis suprarrenal: hidrocortisona 100 mg IV bolo de urgencia", "Educar al paciente y la familia sobre la inyeccion de emergencia"],
      "educacionPaciente": ["Explicar que el tratamiento de reemplazo es de por vida en la mayoria", "La regla del estres: cuando doblar o triplicar la hidrocortisona", "Llevar siempre la tarjeta de alerta medica y la ampolla de hidrocortisona IM de emergencia", "Cuando acudir urgencias: vomitos que impiden tomar la medicacion oral, hipotension, confusion", "El hipotiroidismo central se monitoriza con T4 libre, NO con TSH"],
      "monitorizacion": ["Cortisol basal trimestral para ajuste de dosis", "T4 libre semestral", "Testosterona o estradiol semestral", "PA en cada visita", "IGF-1 anual si recibe GH"]
    },
    "npiNanda": [
      {"codigo": "00178", "nombre": "Gestion ineficaz de la propia salud", "definicion": "Patron de regulacion del regimen terapeutico inadecuado", "caracteristicasDefinitorias": ["Olvidos en la toma de hidrocortisona", "No dobla la dosis en situaciones de estres"], "factoresRelacionados": ["Complejidad del tratamiento de reemplazo multiple", "Falta de conocimiento sobre la crisis suprarrenal"]},
      {"codigo": "00092", "nombre": "Intolerancia a la actividad", "definicion": "Insuficiencia de energia para completar actividades diarias", "caracteristicasDefinitorias": ["Fatiga severa", "Debilidad muscular"], "factoresRelacionados": ["Insuficiencia suprarrenal secundaria no compensada", "Hipotiroidismo central"]},
      {"codigo": "00029", "nombre": "Disminucion del gasto cardiaco", "definicion": "Gasto cardiaco insuficiente", "caracteristicasDefinitorias": ["Hipotension", "Bradicardia"], "factoresRelacionados": ["Insuficiencia suprarrenal secundaria", "Hipotiroidismo central"]}
    ],
    "npiNic": [
      {"codigo": "2080", "nombre": "Manejo del trastorno endocrino", "actividades": ["Administrar hormona de reemplazo en horario correcto", "Monitorizar signos de insuficiencia suprarrenal (hipotension, nauseas, confusion)", "Educar sobre el protocolo de estres"]},
      {"codigo": "6650", "nombre": "Vigilancia", "actividades": ["Detectar signos precoces de crisis suprarrenal", "Monitorizar PA, FC y glucemia en situaciones de estres fisico", "Registrar cumplimiento de la medicacion en cada turno"]},
      {"codigo": "5510", "nombre": "Educacion para la salud", "actividades": ["Ensenyar la regla del doble en situaciones de estres", "Practicar la tecnica de inyeccion de emergencia con el paciente y la familia", "Explicar que hormonas monitorizar y como interpretar los resultados"]}
    ],
    "npiNoc": [
      {"codigo": "0800", "nombre": "Termicidad y metabolismo", "indicadores": ["PA estable", "FC en rango normal", "Sin episodios de crisis suprarrenal", "T4 libre en rango normal"], "escala": "1=Desviacion grave, 5=Sin desviacion"},
      {"codigo": "1803", "nombre": "Conocimiento del proceso de la enfermedad", "indicadores": ["Explica correctamente la regla del estres", "Lleva la tarjeta de alerta medica", "Sabe cuando ir a urgencias"], "escala": "1=Ningun conocimiento, 5=Conocimiento extenso"}
    ],
    "complicaciones": ["Crisis suprarrenal aguda (emergencia vital: hipotension, shock, coma)", "Hipoglucemia severa (especialmente en ninos con deficit de GH)", "Complicaciones cardiovasculares del hipotiroidismo central (dislipemia, aterosclerosis)", "Osteoporosis por deficit de GH y hormonas sexuales"],
    "criteriosAlarma": ["Hipotension + nauseas + confusion (crisis suprarrenal: hidrocortisona 100 mg IV urgente)", "Vomitos que impiden la medicacion oral en paciente con insuficiencia suprarrenal (administrar IM)", "Hipoglucemia severa < 40 mg/dL", "Bradicardia + hipotermia + alteracion del nivel de consciencia (mixedema)"],
    "emergencyLevel": "moderado",
    "relatedPathologyIds": ["pat_cushing"],
    "isPremium": True
  },
  {
    "id": "pat_hiperparatiroidismo",
    "nombre": "Hiperparatiroidismo",
    "bodySystemId": "endocrino",
    "definicion": "Exceso de secrecion de hormona paratiroidea (PTH) que produce hipercalcemia y sus consecuencias sistemicas. El hiperparatiroidismo primario (HPTP) es causado por hipersecrecion autonoma de la paratiroides; el secundario por estimulacion reactiva (insuficiencia renal cronica).",
    "epidemiologia": "El HPTP es la causa mas frecuente de hipercalcemia en pacientes ambulatorios. Incidencia de 66 casos por 100.000 habitantes/ano. Predominio en mujeres posmenopaupausicas (3:1). La causa mas frecuente de HPTP es el adenoma unico de paratiroides (85%).",
    "factoresRiesgo": ["Sexo femenino posmenopausico", "Irradiacion cervical previa", "Litio cronico (estimula la PTH)", "NEM1 y NEM2A (hiperplasia paratiroidea multiglandular)", "Insuficiencia renal cronica (hiperparatiroidismo secundario)", "Deficiencia de vitamina D"],
    "fisiopatologia": "La PTH eleva el calcio serico mediante tres mecanismos: 1) resorcion osea (activacion de osteoclastos), 2) reabsorcion tubular renal de calcio, 3) estimulacion de la 1-alfa-hidroxilasa renal que produce calcitriol (aumenta la absorcion intestinal de calcio). La hipercalcemia produce sus efectos en el SNC (confusion, depresion), muscular (debilidad), renal (nefrolitiasis, poliuria), cardiaco (acortamiento del QT) y digestivo (ulcera peptica, pancreatitis).",
    "signosYSintomas": {
      "signos": ["Hipercalcemia en analitic (calcio > 10.5 mg/dL)", "Calcio corregido por albumina elevado", "PTH elevada en presencia de hipercalcemia", "Nefrolitiasis recurrente en radiografia", "Osteoporosis en densitometria osea (cortical preferente)", "QTc acortado en ECG"],
      "sintomas": ["Renal: nefrolitiasis recurrente, poliuria, polidipsia, nefrocalcinosis", "Oseo: dolor oseo, fracturas por fragilidad, osteitis fibrosa quistica (formas severas)", "Gastrointestinal: anorexia, nauseas, estrenimiento, ulcera peptica, pancreatitis", "Neuromuscular: debilidad muscular proximal, fatiga, confusion", "Regla de las 7 S: Stones, Bones, Groans, Psychic moans y otros"]
    },
    "clasificacion": {
      "nombre": "Clasificacion por origen",
      "tipos": [
        {"nombre": "Primario", "descripcion": "Hipersecrecion autonoma: adenoma unico (85%), hiperplasia multiglandular (15%), carcinoma (< 1%)"},
        {"nombre": "Secundario", "descripcion": "Hiperplasia reactiva de todas las paratiroides por hipocalcemia cronica (IRC, deficit vit D)"},
        {"nombre": "Terciario", "descripcion": "Autonomia adquirida de una glándula hiperplásica en el secundario (post-trasplante renal)"},
        {"nombre": "Crisis hipercalcemica", "descripcion": "Calcio > 14 mg/dL con sintomas graves: emergencia medica"}
      ]
    },
    "diagnostico": {
      "anamnesis": ["Antecedentes de nefrolitiasis recurrente", "Historia de osteoporosis o fracturas en localizaciones atipicas", "Sintomas neuropsiquiatricos: depresion, confusion, fatiga", "Historia familiar de NEM o hipercalcemia familiar", "Uso de litio o suplementos de calcio o vitamina D en exceso"],
      "examenFisico": ["Evaluacion neurologica basica: orientacion, fuerza muscular", "Palpacion cervical: raramente se palpa un adenoma paratiroideo"],
      "pruebas": [
        {"nombre": "Calcio total y albumina (calcio corregido)", "descripcion": "Primer paso: confirmar hipercalcemia real. Calcio corregido = calcio total + 0.8 x (4 - albumina)", "valoresReferencia": "Calcio normal 8.5-10.5 mg/dL; hipercalcemia > 10.5 mg/dL; severa > 14 mg/dL", "cuidadosEnfermeria": ["Ayuno de 4h para calcio", "Registrar la albumina del mismo dia para el calculo del calcio corregido", "Extraer en decubito (el torniquete puede elevar falsamente la albumina)"]},
        {"nombre": "PTH intacta (iPTH)", "descripcion": "Confirma el origen paratiroideo de la hipercalcemia: PTH elevada o inadecuadamente normal en hipercalcemia = HPTP", "valoresReferencia": "PTH normal 15-65 pg/mL; en HPTP usualmente > 65 pg/mL o inapropiadamente elevada para el calcio", "cuidadosEnfermeria": ["Extraer en EDTA en hielo y enviar inmediatamente", "Registrar la hora de extraccion", "Extraer en ayunas a las 8-9h de la manana"]},
        {"nombre": "Ecografia cervical + gammagrafia con sestamibi", "descripcion": "Localizan el adenoma paratiroideo antes de la cirugia; sensibilidad combinada > 90%", "valoresReferencia": "Adenoma paratiroideo: captacion de sestamibi que se retiene en la fase tardia (wash out lento)", "cuidadosEnfermeria": ["Gammagrafia: no requiere preparacion especial", "Sestamibi: contraindicado en embarazo y lactancia", "La localizacion preoperatoria permite cirugia minimamente invasiva en lugar de exploracion bilateral"]},
        {"nombre": "Densitometria osea (DEXA)", "descripcion": "Evalua la densidad mineral osea en columna, femur y radio distal (cortical: mas afectado en HPTP)", "valoresReferencia": "T-score < -2.5 en cualquier sitio = indicacion de paratiroidectomia en asintomatico", "cuidadosEnfermeria": ["Retirar objetos metalicos", "Registrar peso, talla y medicacion actual", "Comparar con DEXA previa si existe"]}
      ]
    },
    "tratamientoMedico": {
      "objetivos": ["Normalizar el calcio serico", "Prevenir las complicaciones renales y oseas", "Cirugia paratiroidea cuando este indicada"],
      "farmacologico": [
        {"nombre": "Cinacalcet", "grupo": "Calcimimetico (modulador del receptor sensible al calcio)", "mecanismo": "Aumenta la sensibilidad del receptor sensible al calcio en la celula paratiroidea, reduciendo la secrecion de PTH", "dosis": "30 mg cada 12h titulando hasta 90 mg cada 12h segun calcio", "cuidadosEnfermeria": ["Monitorizar calcio serico semanalmente al inicio hasta estabilizacion", "Vigilar hipocalcemia como efecto adverso", "Administrar con alimentos o inmediatamente despues de comer"]},
        {"nombre": "Bifosfonatos (Alendronato)", "grupo": "Bisfosfonato oral", "mecanismo": "Inhibe la resorcion osea mediada por osteoclastos; protege la densidad mineral osea en el HPTP", "dosis": "70 mg semana VO en ayunas", "cuidadosEnfermeria": ["Administrar con agua y permanecer de pie 30 min (previene esofagitis)", "Suplementar con calcio y vitamina D", "Contraindicado con TFG < 35 mL/min"]},
        {"nombre": "Hidratacion IV mas furosemida (en crisis hipercalcemica)", "grupo": "Tratamiento de urgencia de la hipercalcemia severa", "mecanismo": "La hidratacion IV restaura el volumen y aumenta la excrecion renal de calcio; la furosemida aumenta la calciuria", "dosis": "SF 0.9% a 200-300 mL/h + Furosemida 20-40 mg IV cada 4-6h tras hidratar", "cuidadosEnfermeria": ["Monitorizar diuresis horaria (objetivo 200-300 mL/h)", "Controlar electrolitos cada 4-6h: hipopotasemia e hiponatremia frecuentes", "Vigilar signos de sobrecarga hidrica en cardiologicos y renales"]}
      ],
      "noFarmacologico": ["Hidratacion oral abundante (> 2 L/dia) para prevenir nefrolitiasis", "Evitar inmovilizacion prolongada (aumenta la resorcion osea)", "Dieta moderada en calcio (no restriccion excesiva: paradoja de la restriccion)", "Evitar tiazidas (reducen la excrecion renal de calcio y empeoran la hipercalcemia)"],
      "quirurgico": ["Paratiroidectomia dirigida (minimamente invasiva, guiada por PTH intraoperatoria)", "Exploracion bilateral en hiperplasia multiglandular o cuando la localizacion falla", "Indicaciones en asintomaticos: calcio > 1 mg/dL sobre el limite, TFG < 60, T-score < -2.5, fracturas, edad < 50 anos"]
    },
    "cuidadosEnfermeria": {
      "valoracion": ["Monitorizar calcio serico en cada ingreso o visita relevante", "Evaluar estado de hidratacion: turgencia cutanea, mucosas, diuresis", "Valorar estado mental: confusion, letargia en hipercalcemia severa", "Monitorizar ECG: QTc acortado en hipercalcemia"],
      "intervenciones": ["En hipercalcemia sintomatica o > 12 mg/dL: hidratacion IV agresiva con SF 0.9%", "Monitorizar diuresis horaria con la hidratacion IV", "Administrar bifosfonatos IV (pamidronato o acido zoledronico) en hipercalcemia severa segun prescripcion", "Preparar al paciente para la cirugia paratiroidea: evitar comidas pre-anestesia, consentimiento"],
      "educacionPaciente": ["Hidratacion oral de al menos 2 litros al dia para prevenir litiasis renal", "Evitar restriccion excesiva de calcio en la dieta (paradojicamente puede estimular mas la PTH)", "Reconocer signos de hipercalcemia: nauseas, confusion, poliuria", "Si hay cinacalcet: importancia de los controles de calcio y los signos de hipocalcemia (parestesias, calambres)"],
      "monitorizacion": ["Calcio y albumina semanales en inicio de cinacalcet", "Calcio diario en crisis hipercalcemica y postoperatorio inmediato de paratiroidectomia", "Funcion renal y electrolitos en hipercalcemia severa tratada con hidratacion", "DEXA anual en HPTP asintomatico"]
    },
    "npiNanda": [
      {"codigo": "00025", "nombre": "Riesgo de desequilibrio de la perfusion tisular renal", "definicion": "Riesgo de disminucion de la circulacion sanguinea renal", "caracteristicasDefinitorias": ["Hipercalcemia", "Nefrolitiasis recurrente", "Poliuria"], "factoresRelacionados": ["Hipercalcemia con nefrocalcinosis y vasoconstriccion renal"]},
      {"codigo": "00132", "nombre": "Dolor agudo", "definicion": "Experiencia sensitiva desagradable", "caracteristicasDefinitorias": ["Colico renal por litiasis calcica", "Dolor oseo"], "factoresRelacionados": ["Nefrolitiasis por hipercalciuria", "Resorcion osea por PTH elevada"]},
      {"codigo": "00028", "nombre": "Riesgo de deficit de volumen de liquidos", "definicion": "Riesgo de disminucion del volumen intravascular, intersticial o intracelular", "caracteristicasDefinitorias": ["Poliuria por hipercalcemia", "Nauseas y vomitos que reducen la ingesta"], "factoresRelacionados": ["Diabetes insipida nefrogena por hipercalcemia cronica"]}
    ],
    "npiNic": [
      {"codigo": "2080", "nombre": "Manejo del trastorno endocrino", "actividades": ["Monitorizar calcio serico periodicamente", "Administrar cinacalcet con alimentos y monitorizar calcio", "Coordinar cirugia paratiroidea cuando este indicada"]},
      {"codigo": "4120", "nombre": "Manejo de liquidos", "actividades": ["En hipercalcemia sintomatica: SF 0.9% IV a ritmo de diuresis forzada", "Monitorizar diuresis horaria", "Controlar electrolitos cada 4-6h"]},
      {"codigo": "5510", "nombre": "Educacion para la salud", "actividades": ["Instruir en hidratacion oral abundante", "Explicar que alimentos contienen calcio sin recomendar restriccion excesiva", "Educar sobre los sintomas de hipercalcemia y cuando consultar urgencias"]}
    ],
    "npiNoc": [
      {"codigo": "0601", "nombre": "Equilibrio electrolítico y acido-basico", "indicadores": ["Calcio serico < 10.5 mg/dL", "Sin sintomas de hipercalcemia", "Diuresis normal"], "escala": "1=Desviacion grave, 5=Sin desviacion"},
      {"codigo": "1902", "nombre": "Control del riesgo", "indicadores": ["Ingesta hidrica > 2 L/dia", "Controles de calcio regulares", "Adhiere a tratamiento medico o planificacion quirurgica"], "escala": "1=Nunca, 5=Constantemente"}
    ],
    "complicaciones": ["Nefrolitiasis recurrente con insuficiencia renal cronica", "Osteoporosis con fracturas de cadera o vertebrales", "Pancreatitis aguda", "Crisis hipercalcemica (calcio > 14 mg/dL: emergencia medica)", "Hipertension arterial"],
    "criteriosAlarma": ["Calcio > 14 mg/dL (crisis hipercalcemica: vomitos, confusion, poliuria severa)", "Colico renal con obstruccion o infeccion", "Fractura patologica", "Arritmia cardiaca con QTc muy acortado", "Pancreatitis aguda"],
    "emergencyLevel": "moderado",
    "relatedPathologyIds": ["pat_irc"],
    "isPremium": True
  },
  {
    "id": "pat_coma_mixedematoso",
    "nombre": "Coma Mixedematoso",
    "bodySystemId": "endocrino",
    "definicion": "Forma extrema y potencialmente mortal del hipotiroidismo descompensado, caracterizada por la trias de alteracion del nivel de consciencia (hasta el coma), hipotermia e hipotiroidismo severo, precipitada generalmente por un factor desencadenante en un paciente con hipotiroidismo de base.",
    "epidemiologia": "Raramente ocurre con una incidencia de 0.22 casos por millon/ano. Mortalidad del 20-50% incluso con tratamiento agresivo. Predomina en mujeres ancianas. Es mas frecuente en invierno (hipotermia como desencadenante).",
    "factoresRiesgo": ["Hipotiroidismo primario de larga data no tratado o mal tratado", "Suspension abrupta de levotiroxina", "Infecciones (neumonia, ITU como desencadenantes mas frecuentes)", "Farmacos depresores del SNC: amiodarona, litio, betabloqueantes en hipotiroideos", "Hipotermia ambiental", "Cirugia o trauma en hipotiroideo", "Fallo cardiaco o respiratorio que precipita el coma"],
    "fisiopatologia": "El hipotiroidismo severo produce disminucion del metabolismo basal, reduccion de la termogenesis, acumulacion de glicosaminoglicanos en tejidos (edema mixedematoso), bradycardia, hipotension e hipoventilacion alveolar con retencion de CO2. La combinacion de hipercapnia, hipoxia, hiponatremia dilucional y la reduccion del metabolismo cerebral produce la depresion del nivel de consciencia. La hipotermia agrava todos estos mecanismos en un circulo vicioso.",
    "signosYSintomas": {
      "signos": ["Hipotermia (temperatura < 35 grados, a veces < 32 grados)", "Bradicardia severa (< 50 lpm)", "Hipotension arterial", "Bradipnea con hipercapnia (CO2 > 50 mmHg)", "Macroglosia y rasgos faciales toscos", "Edema periorbitario y facial sin fovea (mixedema)", "Reflejos osteotendinosos enlentecidos o ausentes", "Piel seca, amarillenta, con caida del tercio externo de las cejas (signo de Hertoghe)"],
      "sintomas": ["Coma o alteracion profunda del nivel de consciencia (principal sintoma)", "Hipotermia severa", "Historia de hipotiroidismo conocido o signos de hipotiroidismo de larga data"]
    },
    "clasificacion": {
      "nombre": "Clasificacion por severidad (escala de puntuacion del coma mixedematoso)",
      "tipos": [
        {"nombre": "Leve (puntuacion 25-60)", "descripcion": "Somnolencia, bradycardia moderada, hipotermia leve; mortalidad 10%"},
        {"nombre": "Moderado (puntuacion 60-100)", "descripcion": "Estupor, bradicardia severa, hipotermia moderada; mortalidad 30%"},
        {"nombre": "Severo (puntuacion > 100)", "descripcion": "Coma profundo, bradicardia extrema, hipotermia severa, fallo respiratorio; mortalidad > 50%"}
      ]
    },
    "diagnostico": {
      "anamnesis": ["Historia de hipotiroidismo previo y tratamiento con levotiroxina", "Suspension reciente de la medicacion tiroidea", "Infeccion, exposicion al frio o cirugia reciente como desencadenante", "Medicacion depresora del SNC: amiodarona, litio, sedantes"],
      "examenFisico": ["Temperatura rectal (termometro de baja temperatura si < 35 grados)", "Glasgow: nivel de consciencia", "Signos vitales: bradicardia, hipotension, bradipnea", "Aspecto fisico: edema facial, piel seca, lengua gruesa, caida de cejas"],
      "pruebas": [
        {"nombre": "TSH y T4 libre (urgente)", "descripcion": "Confirma el hipotiroidismo severo: TSH muy elevada (> 100 mUI/L) con T4 libre indetectable en primario", "valoresReferencia": "TSH > 100 mUI/L con T4 libre indetectable en coma mixedematoso por hipotiroidismo primario", "cuidadosEnfermeria": ["Extraer urgente con hemograma y bioquimica completa", "No esperar el resultado para iniciar el tratamiento en paciente con cuadro clinico tipico", "TSH baja con T4 libre baja sugiere origen central (hipopituitarismo)"]},
        {"nombre": "Gasometria arterial", "descripcion": "Evalua la hipoventilacion: hipercapnia y acidosis respiratoria; hipoxemia", "valoresReferencia": "pCO2 > 50 mmHg en hipoventilacion; pH < 7.35 en acidosis respiratoria", "cuidadosEnfermeria": ["Extraer urgente con la muestra en hielo", "Resultado en 15 minutos", "Puede indicar necesidad de ventilacion mecanica"]},
        {"nombre": "Ionograma, glucemia y cortisol basale", "descripcion": "La hiponatremia dilucional es frecuente (sodio < 125 mEq/L en graves); hipoglucemia; cortisol bajo si hay insuficiencia suprarrenal concomitante", "valoresReferencia": "Na < 130 mEq/L en el 50% de los comas mixedematosos; cortisol < 15 mcg/dL en insuficiencia suprarrenal", "cuidadosEnfermeria": ["Urgente: el resultado orienta el tratamiento inmediato", "Si sodio < 125 mEq/L: restriccion hidrica y posiblemente SF hipertonico"]}
      ]
    },
    "tratamientoMedico": {
      "objetivos": ["Reemplazo urgente de hormonas tiroideas IV", "Tratar el factor desencadenante (infeccion)", "Soporte ventilatorio y hemodinamico", "Recalentamiento pasivo y activo si hay hipotermia severa"],
      "farmacologico": [
        {"nombre": "Levotiroxina IV (T4)", "grupo": "Hormona tiroidea de reemplazo IV urgente", "mecanismo": "Dosis de carga de T4 IV para restaurar rapidamente los depositos tisulares de hormona tiroidea", "dosis": "300-500 mcg IV en bolo lento en 30 min (dosis de carga), seguido de 50-100 mcg/dia IV hasta que el paciente pueda tomar VO", "cuidadosEnfermeria": ["Administrar lentamente (en 30 min) por riesgo de arritmias en corazon mixedematoso", "Monitorizar ECG continuo durante la carga inicial", "Siempre administrar hidrocortisona ANTES de la levotiroxina (puede precipitar crisis suprarrenal)"]},
        {"nombre": "Liotironina IV (T3)", "grupo": "Triyodotironina IV de accion rapida", "mecanismo": "La T3 es la hormona activa; acelera la respuesta al tratar el coma mixedematoso al no requerir conversion hepatica de T4 a T3", "dosis": "5-20 mcg IV cada 8h como adyuvante de la T4 IV en casos severos", "cuidadosEnfermeria": ["Usar solo en casos muy severos o sin respuesta a T4 IV", "Mayor riesgo cardiaco que la T4: monitorizar ECG continuo", "Disponibilidad limitada en muchos paises"]},
        {"nombre": "Hidrocortisona 100 mg IV", "grupo": "Corticosteroide de emergencia", "mecanismo": "Cubre la posible insuficiencia suprarrenal concomitante (frecuente) y previene la crisis suprarrenal que puede precipitarse al aumentar el metabolismo con la tiroxina", "dosis": "100 mg IV bolo inmediato, seguido de 50 mg IV cada 8h durante 48h", "cuidadosEnfermeria": ["Administrar ANTES o simultáneamente a la primera dosis de levotiroxina", "Nunca administrar levotiroxina sin cubrir con hidrocortisona en el coma mixedematoso", "Puede reducirse cuando se confirme que el cortisol es normal"]}
      ],
      "noFarmacologico": ["Intubacion orotraqueal y ventilacion mecanica si pCO2 > 60 mmHg o coma profundo (Glasgow < 8)", "Recalentamiento pasivo con mantas calientes (no recalentamiento activo agresivo: vasodilatacion brusca puede empeorar la hipotension)", "Restriccion hidrica si hay hiponatremia dilucional", "Suero fisiologico para hipotension (no hipoosmolares)", "Busqueda y tratamiento del factor desencadenante (antibioticos si infeccion)"],
      "quirurgico": []
    },
    "cuidadosEnfermeria": {
      "valoracion": ["Monitorizar temperatura rectal con termometro de baja temperatura cada hora (hipotermia severa puede no detectarse con termometros normales)", "Monitorizar Glasgow, PA, FC, FR y SpO2 continuo", "ECG continuo: evaluar bradicardia, QTc y respuesta a la tiroxina IV", "Medir diuresis horaria: retension hidrica frecuente"],
      "intervenciones": ["Recalentamiento con mantas calientes: lento y pasivo, no activo brusco", "Preparar intubacion urgente si Glasgow < 8 o hipercapnia severa", "Administrar hidrocortisona IV antes de la primera dosis de tiroxina", "Administrar tiroxina IV lentamente con monitorizacion cardiaca continua", "Busqueda e inicio inmediato del tratamiento del factor precipitante (antibioticos empiricos para posible infeccion)"],
      "educacionPaciente": ["En la fase aguda la educacion es principalmente hacia los familiares", "Explicar la gravedad de la situacion y el plan de tratamiento", "Tras la recuperacion: educar sobre la importancia de no suspender nunca la levotiroxina", "Identificar los signos precoces de descompensacion del hipotiroidismo para consultar antes de llegar al coma"],
      "monitorizacion": ["Temperatura horaria", "ECG continuo en las primeras 24-48h", "Gasometria arterial cada 4-6h", "TSH y T4 libre a las 24h de inicio del tratamiento", "Sodio cada 4-6h si hay hiponatremia severa"]
    },
    "npiNanda": [
      {"codigo": "00030", "nombre": "Deterioro del intercambio gaseoso", "definicion": "Exceso o deficit en la oxigenacion o eliminacion de CO2", "caracteristicasDefinitorias": ["pCO2 > 50 mmHg", "pH < 7.35", "SpO2 reducida", "Bradipnea"], "factoresRelacionados": ["Hipoventilacion alveolar severa por hipotiroidismo extremo"]},
      {"codigo": "00007", "nombre": "Hipertermia", "definicion": "Temperatura corporal por encima del rango normal (en este caso la variante inversa: hipotermia)", "caracteristicasDefinitorias": ["Temperatura < 35 grados", "Piel fria y palida", "Bradicardia"], "factoresRelacionados": ["Reduccion severa del metabolismo basal por deficit de hormonas tiroideas"]},
      {"codigo": "00029", "nombre": "Disminucion del gasto cardiaco", "definicion": "Gasto cardiaco insuficiente", "caracteristicasDefinitorias": ["Bradicardia < 50 lpm", "Hipotension", "Extremidades frias"], "factoresRelacionados": ["Hipotiroidismo severo con reduccion de la contractilidad y la FC"]}
    ],
    "npiNic": [
      {"codigo": "3300", "nombre": "Manejo de la ventilacion mecanica", "actividades": ["Preparar intubacion si Glasgow < 8 o pCO2 > 60 mmHg", "Monitorizar parametros ventilatorios", "Gasometria arterial de control a la hora del inicio de ventilacion mecanica"]},
      {"codigo": "3800", "nombre": "Tratamiento de la hipotermia", "actividades": ["Recalentamiento pasivo con mantas calientes", "Monitorizar temperatura rectal cada hora", "Evitar el recalentamiento externo activo agresivo"]},
      {"codigo": "2080", "nombre": "Manejo del trastorno endocrino", "actividades": ["Administrar hidrocortisona IV antes de la levotiroxina", "Infundir levotiroxina IV lentamente con ECG continuo", "Monitorizar TSH y T4 libre a las 24h del inicio del tratamiento"]}
    ],
    "npiNoc": [
      {"codigo": "0906", "nombre": "Toma de decisiones", "definicion": "Capacidad de tomar decisiones del paciente", "indicadores": ["Recuperacion progresiva del nivel de consciencia", "Glasgow en mejoria en 24-48h", "Respuesta a estimulos verbales"], "escala": "1=Gravemente comprometido, 5=No comprometido"},
      {"codigo": "0402", "nombre": "Estado respiratorio: intercambio gaseoso", "indicadores": ["pCO2 < 45 mmHg con tratamiento", "SpO2 > 90%", "pH > 7.35"], "escala": "1=Desviacion grave, 5=Sin desviacion"}
    ],
    "complicaciones": ["Paro cardiorrespiratorio (bradicardia extrema y asistolia)", "Fallo respiratorio con necesidad de ventilacion mecanica", "Crisis suprarrenal precipitada por el tratamiento con tiroxina sin cobertura de corticoides", "Hiponatremia severa con edema cerebral", "Muerte (20-50% incluso con tratamiento)"],
    "criteriosAlarma": ["Temperatura < 32 grados (hipotermia severa)", "Glasgow < 8 (coma profundo: intubacion inmediata)", "Bradicardia < 40 lpm o paro sinusal", "pCO2 > 60 mmHg (ventilacion mecanica urgente)", "Hipotension refractaria a fluidos"],
    "emergencyLevel": "critico",
    "relatedPathologyIds": ["pat_hipotiroidismo", "pat_hipopituitarismo"],
    "isPremium": True
  }
]

with open('F:/programas/Patologias/src/data/pathologies.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

data.extend(new_pathologies)

with open('F:/programas/Patologias/src/data/pathologies.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f'Done. Total pathologies: {len(data)}')
