import json

new_pathologies = [
  # ===== CARDIOVASCULAR =====
  {
    "id": "pat_pericarditis",
    "nombre": "Pericarditis",
    "bodySystemId": "cardiovascular",
    "definicion": "Inflamacion del pericardio (saco fibroso que rodea el corazon), que puede ser aguda, recurrente o cronica. La forma mas frecuente es la pericarditis aguda idiopatica o viral.",
    "epidemiologia": "Representa el 5% de las consultas por dolor toracico no isquemico en urgencias. Mas frecuente en hombres jovenes (16-65 anos). La causa viral o idiopatica representa el 80-90% de los casos en paises desarrollados.",
    "factoresRiesgo": ["Infecciones virales recientes (Coxsackie, Echovirus, VIH)", "Enfermedades autoinmunes (LES, AR)", "Insuficiencia renal cronica (uremica)", "Infarto agudo de miocardio reciente (sindrome de Dressler)", "Trauma toracico", "Radioterapia mediastinal"],
    "fisiopatologia": "La inflamacion del pericardio produce exudado que puede ser seroso, fibrinoso, purulento o hemorragico. El engrosamiento y la fusion de las hojas pericardicas genera friccion y dolor. En casos de acumulacion rapida de liquido se puede producir taponamiento cardiaco con compromiso hemodinamico.",
    "signosYSintomas": {
      "signos": ["Frote pericardico (patognomonico)", "Fiebre de bajo grado", "Cambios difusos en ECG (elevacion del ST en silla de montar)", "Derrame pericardico en ecocardiograma", "Taquicardia"],
      "sintomas": ["Dolor toracico pleuritico (empeora en decubito, mejora sentado hacia adelante)", "Disnea", "Tos seca", "Malestar general", "Escalofrios"]
    },
    "clasificacion": {
      "nombre": "Clasificacion temporal",
      "tipos": [
        {"nombre": "Aguda", "descripcion": "Duracion < 4-6 semanas"},
        {"nombre": "Incesante", "descripcion": "Duracion 4-6 semanas a 3 meses sin remision"},
        {"nombre": "Recurrente", "descripcion": "Recidiva despues de intervalo libre de al menos 4-6 semanas"},
        {"nombre": "Cronica", "descripcion": "Duracion > 3 meses; puede evolucionar a pericarditis constrictiva"}
      ]
    },
    "diagnostico": {
      "anamnesis": ["Caracteristicas del dolor (pleuritico, posicional)", "Infeccion viral reciente (2-6 semanas previas)", "Antecedentes de enfermedades autoinmunes o renales", "Historia de IAM, cirugia cardiaca o radioterapia"],
      "examenFisico": ["Auscultacion de frote pericardico trifasico en mesocardio", "Signos vitales: fiebre, taquicardia", "Buscar triada de Beck: hipotension + ingurgitacion yugular + ruidos apagados"],
      "pruebas": [
        {"nombre": "ECG", "descripcion": "Elevacion difusa del ST en silla de montar con depresion de PR; evolucion en 4 etapas", "valoresReferencia": "Elevacion ST difusa no focal, depresion del segmento PR", "cuidadosEnfermeria": ["Realizar ECG de 12 derivaciones al ingreso", "Repetir segun evolucion", "Comparar con ECG previos"]},
        {"nombre": "Ecocardiograma", "descripcion": "Detecta derrame pericardico y signos de taponamiento", "valoresReferencia": "Derrame: leve <10mm, moderado 10-20mm, severo >20mm", "cuidadosEnfermeria": ["Posicionar en decubito lateral izquierdo", "Monitorizar signos vitales durante el procedimiento"]},
        {"nombre": "PCR y VSG", "descripcion": "Marcadores de inflamacion activa; la PCR guia duracion del tratamiento", "valoresReferencia": "PCR < 0.5 mg/dL normal; VSG < 20 mm/h", "cuidadosEnfermeria": ["Extraer muestra venosa", "Registrar resultado para seguimiento"]},
        {"nombre": "Troponina", "descripcion": "Elevada en miopericarditis con afectacion miocardica asociada", "valoresReferencia": "Troponina I < 0.04 ng/mL normal", "cuidadosEnfermeria": ["Extraer en paralelo con otros biomarcadores", "Registrar hora de extraccion"]}
      ]
    },
    "tratamientoMedico": {
      "objetivos": ["Aliviar el dolor y la inflamacion", "Prevenir recurrencias", "Detectar y tratar taponamiento cardiaco y pericarditis constrictiva"],
      "farmacologico": [
        {"nombre": "Aspirina", "grupo": "AINE", "mecanismo": "Inhibe ciclooxigenasa reduciendo prostaglandinas inflamatorias", "dosis": "750-1000 mg cada 8h por 1-2 semanas con reduccion gradual", "cuidadosEnfermeria": ["Administrar con alimentos para reducir gastropatia", "Monitorizar signos de sangrado digestivo", "Reducir dosis gradualmente, no suspender abruptamente"]},
        {"nombre": "Ibuprofeno", "grupo": "AINE", "mecanismo": "Inhibe COX-1 y COX-2 reduciendo inflamacion pericardica", "dosis": "600 mg cada 8h por 1-2 semanas", "cuidadosEnfermeria": ["Administrar con omeprazol como gastroproteccion", "Monitorizar PA y funcion renal con uso prolongado"]},
        {"nombre": "Colchicina", "grupo": "Antiinflamatorio especifico", "mecanismo": "Inhibe quimiotaxis de neutrofilos reduciendo inflamacion y recurrencias", "dosis": "0.5 mg cada 12h por 3 meses asociada a AINE", "cuidadosEnfermeria": ["Vigilar diarrea como efecto adverso frecuente", "Contraindicada en insuficiencia renal grave", "Educar sobre importancia de completar el tratamiento"]},
        {"nombre": "Prednisona", "grupo": "Corticosteroide", "mecanismo": "Potente antiinflamatorio; reservado para casos refractarios o contraindicacion de AINEs", "dosis": "0.25-0.5 mg/kg/dia con reduccion gradual muy lenta", "cuidadosEnfermeria": ["Usar solo cuando AINEs fallen o esten contraindicados", "Monitorizar glucemia, PA y peso", "Explicar mayor riesgo de recurrencias con corticoides"]}
      ],
      "noFarmacologico": ["Reposo relativo hasta desaparicion de sintomas", "Restringir actividad fisica intensa por 3 meses en atletas", "Evitar anticoagulantes si hay derrame por riesgo hemorragico"]
    },
    "cuidadosEnfermeria": {
      "valoracion": ["Evaluar caracteristicas del dolor toracico: intensidad y posicion", "Monitorizar FC, FR, PA, SpO2 y temperatura", "Auscultar frote pericardico en cada valoracion", "Detectar signos de taponamiento cardiaco (triada de Beck)"],
      "intervenciones": ["Posicionar sentado con inclinacion anterior para aliviar dolor", "Administrar analgesicos y antiinflamatorios segun prescripcion", "Monitorizar ECG continuo para detectar arritmias", "Preparar equipo de pericardiocentesis si hay sospecha de taponamiento", "Control de PCR semanal para guiar duracion del tratamiento"],
      "educacionPaciente": ["Explicar la naturaleza generalmente benigna y autolimitada", "Importancia de completar colchicina para prevenir recurrencias", "Restriccion de ejercicio hasta normalizacion de PCR", "Signos de alarma: empeoramiento de disnea, hipotension"],
      "monitorizacion": ["ECG diario en hospitalizados", "Signos vitales cada 4-6h", "PCR semanal hasta normalizacion", "Ecocardiograma de control si habia derrame"]
    },
    "npiNanda": [
      {"codigo": "00132", "nombre": "Dolor agudo", "definicion": "Experiencia sensitiva y emocional desagradable asociada con dano tisular real o potencial", "caracteristicasDefinitorias": ["Informe verbal de dolor toracico pleuritico", "Posicion antialgica (sentado hacia adelante)", "Taquicardia"], "factoresRelacionados": ["Inflamacion pericardica", "Friccion entre hojas del pericardio"]},
      {"codigo": "00029", "nombre": "Disminucion del gasto cardiaco", "definicion": "Cantidad insuficiente de sangre bombeada por el corazon para satisfacer las demandas metabolicas", "caracteristicasDefinitorias": ["Taquicardia", "Hipotension", "Pulso paradojico", "Distension yugular"], "factoresRelacionados": ["Derrame pericardico", "Taponamiento cardiaco"]},
      {"codigo": "00146", "nombre": "Ansiedad", "definicion": "Vaga sensacion de malestar o amenaza acompanada de respuesta autonoma", "caracteristicasDefinitorias": ["Expresion de preocupacion", "Tension", "Taquicardia"], "factoresRelacionados": ["Dolor toracico", "Amenaza percibida para la salud"]}
    ],
    "npiNic": [
      {"codigo": "1400", "nombre": "Manejo del dolor", "actividades": ["Evaluar dolor con escala numerica cada 4h", "Administrar analgesicos segun prescripcion", "Posicionar al paciente en posicion antialgica", "Monitorizar efectividad del tratamiento"]},
      {"codigo": "4040", "nombre": "Cuidados cardiacos", "actividades": ["Monitorizar signos vitales y ECG continuo", "Vigilar signos de taponamiento (triada de Beck)", "Preparar pericardiocentesis si necesario", "Limitar actividad fisica"]},
      {"codigo": "5820", "nombre": "Disminucion de la ansiedad", "actividades": ["Explicar procedimientos y plan de cuidados", "Promover ambiente tranquilo", "Acompanar al paciente durante episodios de ansiedad"]}
    ],
    "npiNoc": [
      {"codigo": "2102", "nombre": "Nivel del dolor", "indicadores": ["Dolor toracico < 3/10", "Ausencia de posicion antialgica", "FC en rango normal"], "escala": "1=Grave, 2=Sustancial, 3=Moderado, 4=Leve, 5=Ningun"},
      {"codigo": "0400", "nombre": "Efectividad de la bomba cardiaca", "indicadores": ["PA sistolica estable", "Ausencia de pulso paradojico", "FC entre 60-100 lpm"], "escala": "1=Desviacion grave, 5=Sin desviacion"}
    ],
    "complicaciones": ["Taponamiento cardiaco (emergencia)", "Pericarditis constrictiva cronica", "Miopericarditis", "Recurrencias en 15-30% sin colchicina"],
    "criteriosAlarma": ["Triada de Beck: hipotension + ingurgitacion yugular + ruidos apagados", "Pulso paradojico > 10 mmHg", "PA sistolica < 90 mmHg", "Fiebre > 38 grados refractaria a AINEs"],
    "emergencyLevel": "moderado",
    "relatedPathologyIds": ["pat_icc", "pat_irc"],
    "isPremium": True
  },
  {
    "id": "pat_shock_cardiogenico",
    "nombre": "Shock Cardiogenico",
    "bodySystemId": "cardiovascular",
    "definicion": "Estado de hipoperfusion tisular critica causado por falla cardiaca primaria, caracterizado por hipotension persistente, bajo gasto cardiaco y signos de hipoperfusion organica a pesar de una precarga adecuada.",
    "epidemiologia": "Complica el 5-10% de los IAM con elevacion del ST. Mortalidad hospitalaria del 40-60%. Es la causa principal de muerte en pacientes hospitalizados por IAM.",
    "factoresRiesgo": ["Infarto agudo de miocardio extenso anterior", "Insuficiencia cardiaca previa", "Edad avanzada", "Diabetes mellitus", "Enfermedad multivaso coronaria", "Retraso en la reperfusion"],
    "fisiopatologia": "La perdida masiva de miocardio funcional (>40% del VI) reduce el gasto cardiaco. La hipoperfusion activa mecanismos compensadores: taquicardia refleja, vasoconstriccion periferica y retencion de liquidos. Estos mecanismos aumentan la demanda de oxigeno miocardico agravando la disfuncion ventricular en un circulo vicioso que lleva a acidosis lactica y fallo multiorganico.",
    "signosYSintomas": {
      "signos": ["PA sistolica < 90 mmHg por mas de 30 min", "Indice cardiaco < 1.8 L/min/m2", "Extremidades frias y moteadas", "Oliguria < 0.5 mL/kg/h", "Ingurgitacion yugular", "Estertores pulmonares bibasales"],
      "sintomas": ["Confusion o agitacion por hipoperfusion cerebral", "Disnea severa", "Debilidad extrema", "Sensacion de muerte inminente"]
    },
    "clasificacion": {
      "nombre": "Clasificacion SCAI de shock cardiogenico",
      "tipos": [
        {"nombre": "Estadio A (At risk)", "descripcion": "Riesgo de shock pero sin signos clinicos"},
        {"nombre": "Estadio B (Beginning)", "descripcion": "Hipoperfusion relativa con PA borderline o taquicardia compensadora"},
        {"nombre": "Estadio C (Classic)", "descripcion": "Shock cardiogenico clasico que requiere soporte vasopresor"},
        {"nombre": "Estadio D (Deteriorating)", "descripcion": "Deterioro hemodinamico a pesar del soporte inicial"},
        {"nombre": "Estadio E (Extremis)", "descripcion": "Colapso circulatorio, paro cardiaco inminente o en curso"}
      ]
    },
    "diagnostico": {
      "anamnesis": ["Dolor toracico previo sugestivo de IAM", "Antecedentes de cardiopatia o IC", "Tiempo de evolucion de sintomas", "Medicacion previa: betabloqueantes, diureticos"],
      "examenFisico": ["Medicion de PA: hipotension", "Evaluacion de perfusion periferica: tiempo de relleno capilar", "Auscultacion cardiaca y pulmonar", "Estado de conciencia con escala de Glasgow", "Diuresis por sonda vesical"],
      "pruebas": [
        {"nombre": "Lactato arterial", "descripcion": "Marcador de hipoperfusion tisular y pronostico", "valoresReferencia": "Normal < 2 mmol/L; shock > 2; grave > 4 mmol/L", "cuidadosEnfermeria": ["Obtener muestra de gases arteriales", "Repetir cada 2-4h para evaluar respuesta al tratamiento"]},
        {"nombre": "Ecocardiograma urgente", "descripcion": "Evalua FEVI, motilidad segmentaria, derrame y causa del shock", "valoresReferencia": "FEVI < 30% en shock cardiogenico tipico", "cuidadosEnfermeria": ["Facilitar acceso urgente al ecocardiologo", "Mantener monitoreo continuo durante el estudio"]},
        {"nombre": "Troponina I/T", "descripcion": "Cuantifica dano miocardico isquemico", "valoresReferencia": "Troponina I > 0.04 ng/mL indica dano significativo", "cuidadosEnfermeria": ["Serie cada 3-6h en primeras 12h", "Registrar hora de inicio de sintomas"]},
        {"nombre": "Gasometria arterial", "descripcion": "Evalua acidosis metabolica, hipoxemia y fallo respiratorio", "valoresReferencia": "pH 7.35-7.45; pO2 > 80 mmHg; HCO3 22-26 mEq/L", "cuidadosEnfermeria": ["Extraer muestra arterial radial o femoral", "Aplicar presion 5 min post-extraccion", "Resultado urgente en menos de 15 min"]}
      ]
    },
    "tratamientoMedico": {
      "objetivos": ["Restablecer perfusion miocardica mediante reperfusion urgente", "Estabilizar hemodinamica con PAM > 65 mmHg", "Prevenir fallo multiorganico", "Reducir mortalidad"],
      "farmacologico": [
        {"nombre": "Noradrenalina", "grupo": "Vasopresor agonista alfa-adrenergico", "mecanismo": "Vasoconstriccion periferica que aumenta la PA media y la perfusion coronaria", "dosis": "0.1-2 mcg/kg/min en infusion continua IV por via central", "cuidadosEnfermeria": ["NUNCA administrar por via periferica", "Monitorizar PA invasiva cada minuto con linea arterial", "Vigilar isquemia distal en extremidades", "Ajustar dosis con objetivo PAM > 65 mmHg"]},
        {"nombre": "Dobutamina", "grupo": "Inotrapico agonista beta1", "mecanismo": "Aumenta contractilidad y gasto cardiaco sin vasoconstriccion periferica significativa", "dosis": "2-20 mcg/kg/min en infusion continua IV", "cuidadosEnfermeria": ["Monitorizar FC: puede producir taquicardia", "Vigilar arritmias en ECG continuo", "Puede combinarse con noradrenalina si hay hipotension"]},
        {"nombre": "Aspirina mas antiagregante", "grupo": "Doble antiagregacion plaquetaria", "mecanismo": "Previene trombosis coronaria aguda y reoclusion post-reperfusion", "dosis": "Aspirina 300 mg mas Ticagrelor 180 mg o Clopidogrel 600 mg por SNG o VO", "cuidadosEnfermeria": ["Administrar antes de la reperfusion si es posible", "Triturar comprimidos si se administran por SNG", "Vigilar signos de sangrado activo"]},
        {"nombre": "Heparina sodica", "grupo": "Anticoagulante parenteral", "mecanismo": "Previene propagacion del trombo coronario y trombosis del cateter", "dosis": "Bolo 60 UI/kg (max 4000 UI) IV seguido de infusion 12 UI/kg/h ajustada por KPTT", "cuidadosEnfermeria": ["Controlar KPTT cada 6h (objetivo 60-100 seg)", "Vigilar sitios de acceso vascular por sangrado", "Tener protamina disponible como antidoto"]}
      ],
      "noFarmacologico": ["Reperfusion urgente: angioplastia primaria en menos de 90 min", "Oxigenoterapia o ventilacion mecanica si SpO2 < 90%", "Sonda vesical para medicion de diuresis horaria", "Acceso venoso central para administracion de vasopresores", "Linea arterial radial para monitoreo continuo de PA"],
      "quirurgico": ["Angioplastia coronaria percutanea primaria (primera eleccion)", "Balon de contrapulsacion intraortico", "Dispositivo de asistencia ventricular percutaneo (Impella)", "Cirugia de revascularizacion en enfermedad multivaso seleccionada"]
    },
    "cuidadosEnfermeria": {
      "valoracion": ["Monitorizar PA invasiva, FC, FR, SpO2 de forma continua", "Medir diuresis horaria con objetivo > 0.5 mL/kg/h", "Evaluar estado de conciencia con escala de Glasgow", "Valorar perfusion periferica: temperatura, relleno capilar, coloracion", "Medir PVC si hay cateter venoso central"],
      "intervenciones": ["Preparar via venosa central de gran calibre de urgencia", "Administrar vasopresores e inotopicos segun protocolo", "Colocar sonda vesical para medicion horaria", "Preparar sala de hemodinamica con urgencia", "Monitorear ECG continuo de 12 derivaciones", "Mantener hemoderivados disponibles"],
      "educacionPaciente": ["Explicar procedimientos de forma simple dado que el paciente puede estar confuso", "Informar a la familia sobre la gravedad y los procedimientos que se realizaran", "Mantener a la familia actualizada sobre el estado hemodinamico del paciente"],
      "monitorizacion": ["PA invasiva continua", "FC, FR, SpO2 continuo", "Diuresis horaria", "Lactato arterial cada 2-4h", "Ionograma y funcion renal cada 6-12h", "ECG continuo"]
    },
    "npiNanda": [
      {"codigo": "00029", "nombre": "Disminucion del gasto cardiaco", "definicion": "Cantidad insuficiente de sangre bombeada por el corazon para satisfacer las demandas metabolicas", "caracteristicasDefinitorias": ["PA sistolica < 90 mmHg", "Taquicardia > 100 lpm", "Extremidades frias", "Oliguria"], "factoresRelacionados": ["Infarto miocardico extenso", "Disfuncion ventricular izquierda severa"]},
      {"codigo": "00032", "nombre": "Patron respiratorio ineficaz", "definicion": "Inspiracion o espiracion que no proporciona ventilacion adecuada", "caracteristicasDefinitorias": ["Disnea severa", "Uso de musculos accesorios", "SpO2 < 90%"], "factoresRelacionados": ["Edema pulmonar por fallo ventricular izquierdo"]},
      {"codigo": "00025", "nombre": "Riesgo de perfusion tisular ineficaz", "definicion": "Riesgo de disminucion de la circulacion a los tejidos corporales", "caracteristicasDefinitorias": ["Signos de hipoperfusion organica multiple"], "factoresRelacionados": ["Gasto cardiaco reducido", "Hipotension severa persistente"]}
    ],
    "npiNic": [
      {"codigo": "4254", "nombre": "Cuidados del shock cardiogenico", "actividades": ["Monitorizar PA invasiva y ECG continuo", "Administrar vasopresores e inotopicos prescritos", "Medir diuresis horaria", "Preparar equipo para procedimientos de reperfusion urgente"]},
      {"codigo": "3300", "nombre": "Manejo de la ventilacion mecanica", "actividades": ["Preparar equipo de intubacion si SpO2 < 88%", "Monitorizar parametros ventilatorios", "Aspirar secreciones segun necesidad clinica"]},
      {"codigo": "4160", "nombre": "Manejo de la resucitacion", "actividades": ["Mantener via aerea permeable", "Administrar oxigeno suplementario al 100%", "Documentar respuesta hemodinamica al tratamiento"]}
    ],
    "npiNoc": [
      {"codigo": "0400", "nombre": "Efectividad de la bomba cardiaca", "indicadores": ["PA sistolica > 90 mmHg", "Diuresis > 0.5 mL/kg/h", "Lactato < 2 mmol/L"], "escala": "1=Desviacion grave, 5=Sin desviacion"},
      {"codigo": "0402", "nombre": "Estado circulatorio", "indicadores": ["Perfusion periferica adecuada", "Relleno capilar < 2 seg", "Ausencia de moteado cutaneo"], "escala": "1=Desviacion grave, 5=Sin desviacion"}
    ],
    "complicaciones": ["Fallo multiorganico", "Edema agudo de pulmon", "Arritmias malignas ventriculares", "CID", "Muerte"],
    "criteriosAlarma": ["PA sistolica < 80 mmHg refractaria a vasopresores", "Lactato > 8 mmol/L", "Glasgow < 8 (requiere intubacion urgente)", "Anuria mayor a 2 horas", "Fibrilacion ventricular o TV sin pulso"],
    "emergencyLevel": "critico",
    "relatedPathologyIds": ["pat_iam", "pat_icc"],
    "isPremium": True
  },
  {
    "id": "pat_valvulopatia",
    "nombre": "Valvulopatias Cardiacas",
    "bodySystemId": "cardiovascular",
    "definicion": "Conjunto de enfermedades que afectan a las valvulas cardiacas (mitral, aortica, tricuspidea, pulmonar), produciendo estenosis (obstruccion al flujo) o insuficiencia (regurgitacion) con consecuente sobrecarga de presion o volumen en las camaras cardiacas.",
    "epidemiologia": "Afectan al 2-3% de la poblacion general adulta. La estenosis aortica es la valvulopatia mas frecuente en paises desarrollados (causa degenerativa en mayores de 65 anos). La insuficiencia mitral es la segunda mas prevalente.",
    "factoresRiesgo": ["Edad avanzada (degeneracion calcifica)", "Fiebre reumatica (causa mas frecuente en paises en desarrollo)", "Endocarditis infecciosa", "Cardiopatia isquemica (insuficiencia mitral isquemica)", "Enfermedades del tejido conectivo (Marfan, Ehlers-Danlos)", "Radioterapia mediastinal previa", "Hipertension arterial severa"],
    "fisiopatologia": "En la estenosis, el orificio valvular reducido genera gradiente de presion: en estenosis aortica el VI desarrolla hipertrofia concentrica; en estenosis mitral hay dilatacion de auricula izquierda con riesgo de FA y embolia. En la insuficiencia, el reflujo produce sobrecarga de volumen: en insuficiencia aortica hay dilatacion del VI; en insuficiencia mitral la AI y el VI se dilatan. En ambos mecanismos el resultado final es la disfuncion ventricular y la IC.",
    "signosYSintomas": {
      "signos": ["Soplos cardiacos caracteristicos segun valvula afectada", "Cardiomegalia en Rx de torax", "Signos de IC: estertores, edemas, ingurgitacion yugular", "Pulso parvus et tardus en estenosis aortica severa", "Latido apical desplazado en insuficiencia aortica severa"],
      "sintomas": ["Disnea de esfuerzo progresiva", "Angina en estenosis aortica (triada de estenosis aortica)", "Sincope en estenosis aortica severa", "Palpitaciones (especialmente en FA asociada)", "Fatiga cronica", "Edemas en miembros inferiores"]
    },
    "clasificacion": {
      "nombre": "Clasificacion por severidad (ecocardiografica)",
      "tipos": [
        {"nombre": "Leve", "descripcion": "Cambios hemodinamicos minimos, paciente asintomatico"},
        {"nombre": "Moderada", "descripcion": "Repercusion hemodinama parcial, sintomas con ejercicio intenso"},
        {"nombre": "Severa", "descripcion": "Repercusion hemodinama significativa, sintomas con ejercicio habitual o en reposo"},
        {"nombre": "Muy severa", "descripcion": "Compromiso hemodinamico critico, indicacion quirurgica urgente"}
      ]
    },
    "diagnostico": {
      "anamnesis": ["Fiebre reumatica en la infancia", "Soplo cardiaco conocido de larga data", "Evolucion de la capacidad funcional", "Sincopes o presincopes (estenosis aortica)", "Palpitaciones o episodios de FA"],
      "examenFisico": ["Auscultacion cardiaca detallada: localizacion, tipo, irradiacion del soplo", "Cuantificacion de grado funcional (NYHA)", "Palpacion del pulso arterial", "Evaluacion de signos de IC"],
      "pruebas": [
        {"nombre": "Ecocardiograma Doppler transtorax", "descripcion": "Estudio fundamental: gradiente valvular, area valvular, funcion ventricular, severidad", "valoresReferencia": "Estenosis aortica severa: area < 1 cm2, gradiente medio > 40 mmHg", "cuidadosEnfermeria": ["No requiere preparacion especial", "Posicionar en decubito lateral izquierdo", "Facilitar acceso al torax del paciente"]},
        {"nombre": "ECG", "descripcion": "Detecta hipertrofia ventricular, FA asociada, bloqueos de conduccion", "valoresReferencia": "Criterios de HVI en estenosis aortica; FA en estenosis mitral", "cuidadosEnfermeria": ["Realizar en reposo", "Registrar ritmo y frecuencia cardiaca"]},
        {"nombre": "Radiografia de torax", "descripcion": "Valora cardiomegalia, congestion vascular pulmonar, calcificaciones valvulares", "valoresReferencia": "Indice cardiotorax < 0.5 normal", "cuidadosEnfermeria": ["Posicion PA de pie si el paciente puede", "Verificar ausencia de elementos metalicos"]},
        {"nombre": "Cateterismo cardiaco", "descripcion": "Confirma severidad cuando hay discordancia clinico-ecografica; descarta coronariopatia", "valoresReferencia": "Gradiente transvalvular aortico > 50 mmHg en estenosis severa", "cuidadosEnfermeria": ["Preparar zona de puncion inguinal o radial", "Vigilar via de acceso 24h post-procedimiento", "Monitorizar PA y ECG post-cateterismo"]}
      ]
    },
    "tratamientoMedico": {
      "objetivos": ["Controlar sintomas y mejorar calidad de vida", "Prevenir complicaciones (FA, IC, embolia)", "Definir momento optimo de intervencion valvular"],
      "farmacologico": [
        {"nombre": "Diureticos (Furosemida)", "grupo": "Diuretico de asa", "mecanismo": "Reduce congestion pulmonar y edemas en IC valvular descompensada", "dosis": "20-80 mg/dia VO o IV segun sintomas", "cuidadosEnfermeria": ["Monitorizar diuresis y peso diario", "Controlar electrolitos semanales", "Vigilar signos de deshidratacion"]},
        {"nombre": "Anticoagulacion (Acenocumarol/Warfarina)", "grupo": "Anticoagulante oral antagonista de vitamina K", "mecanismo": "Previene trombosis en FA asociada y en valvulas mecanicas sustituidas", "dosis": "Ajustar segun INR objetivo: FA 2-3; valvulas mecanicas 2.5-3.5", "cuidadosEnfermeria": ["Controlar INR segun protocolo", "Educar sobre alimentos que interaccionan con acenocumarol", "Vigilar signos de sangrado: hematomas, sangre en orina o heces"]},
        {"nombre": "Betabloqueantes (Bisoprolol)", "grupo": "Betabloqueante selectivo beta1", "mecanismo": "Controla frecuencia cardiaca en FA; reduce demanda miocardica de oxigeno", "dosis": "2.5-10 mg/dia", "cuidadosEnfermeria": ["Monitorizar FC y PA antes de cada dosis", "No suspender abruptamente", "Vigilar broncoespasmo en asmaticos"]},
        {"nombre": "Profilaxis antibiotica (Amoxicilina)", "grupo": "Antibiotico betalactamico", "mecanismo": "Previene endocarditis infecciosa en procedimientos dentales o invasivos en alto riesgo", "dosis": "2 g VO 30-60 min antes de procedimiento dental de alto riesgo", "cuidadosEnfermeria": ["Identificar pacientes con indicacion de profilaxis", "Verificar alergias a penicilinas", "Administrar en tiempo correcto antes del procedimiento"]}
      ],
      "noFarmacologico": ["Seguimiento ecocardiografico periodico segun severidad", "Actividad fisica adaptada (evitar ejercicio intenso en estenosis severa)", "Higiene dental estricta para reducir riesgo de endocarditis"],
      "quirurgico": ["Recambio valvular quirurgico (valvula biologica o mecanica)", "Valvuloplastia percutanea con balon (estenosis mitral)", "TAVI: reemplazo valvular aortico transcateter en alto riesgo quirurgico", "Reparacion mitral (mitroplastia) cuando es factible"]
    },
    "cuidadosEnfermeria": {
      "valoracion": ["Auscultar soplo cardiaco y cambios en sus caracteristicas", "Monitorizar signos de IC: disnea, edemas, ingurgitacion yugular", "Evaluar clase funcional NYHA en cada contacto", "Controlar FC para detectar FA (pulso irregular)"],
      "intervenciones": ["Administrar medicacion segun prescripcion", "Monitorizar INR y ajustar anticoagulacion con el medico", "Pesar al paciente diariamente en hospitalizados", "Preparar al paciente para procedimientos diagnosticos y terapeuticos", "Coordinar con equipo de cardiocirugia cuando este indicada la intervencion"],
      "educacionPaciente": ["Explicar la importancia del seguimiento ecocardiografico", "Educacion sobre anticoagulacion: importancia del INR, alimentos, signos de sangrado", "Profilaxis de endocarditis: higiene dental, informar al dentista", "Reconocer signos de descompensacion: aumento de disnea, edemas, palpitaciones"],
      "monitorizacion": ["Signos vitales cada 8h", "Peso diario en IC descompensada", "INR segun protocolo si anticoagulado", "ECG periodico para detectar FA o cambios de conduccion"]
    },
    "npiNanda": [
      {"codigo": "00029", "nombre": "Disminucion del gasto cardiaco", "definicion": "Cantidad insuficiente de sangre bombeada por el corazon", "caracteristicasDefinitorias": ["Soplo cardiaco", "Disnea de esfuerzo", "Taquicardia", "Edemas"], "factoresRelacionados": ["Disfuncion valvular", "Sobrecarga de presion o volumen"]},
      {"codigo": "00092", "nombre": "Intolerancia a la actividad", "definicion": "Insuficiencia de energia fisiologica o psicologica para completar las actividades diarias", "caracteristicasDefinitorias": ["Disnea al esfuerzo", "Fatiga", "Angina con el ejercicio"], "factoresRelacionados": ["Desequilibrio entre aporte y demanda de oxigeno", "Disfuncion valvular"]},
      {"codigo": "00078", "nombre": "Gestion de salud ineficaz", "definicion": "Patron de regulacion del regimen terapeutico inadecuado para alcanzar objetivos de salud", "caracteristicasDefinitorias": ["Incumplimiento de controles ecocardiograficos", "Falta de adherencia a anticoagulacion"], "factoresRelacionados": ["Complejidad del tratamiento", "Falta de conocimiento"]}
    ],
    "npiNic": [
      {"codigo": "4040", "nombre": "Cuidados cardiacos", "actividades": ["Monitorizar signos y sintomas de IC", "Auscultar soplos periodicamente", "Pesar diariamente al paciente", "Administrar medicacion prescrita"]},
      {"codigo": "4120", "nombre": "Manejo de liquidos", "actividades": ["Control de balance hidrico", "Monitorizar electrolitos", "Vigilar signos de sobrecarga hidrica"]},
      {"codigo": "5510", "nombre": "Educacion para la salud", "actividades": ["Ensenyar importancia del seguimiento ecografico", "Educar sobre anticoagulacion y profilaxis de endocarditis", "Explicar signos de descompensacion"]}
    ],
    "npiNoc": [
      {"codigo": "0400", "nombre": "Efectividad de la bomba cardiaca", "indicadores": ["PA estable", "FC controlada", "Ausencia de signos de IC activa"], "escala": "1=Desviacion grave, 5=Sin desviacion"},
      {"codigo": "1803", "nombre": "Conocimiento del proceso de la enfermedad", "indicadores": ["Explica su valvulopatia y su tratamiento", "Menciona signos de alarma correctamente"], "escala": "1=Ningun conocimiento, 5=Conocimiento extenso"}
    ],
    "complicaciones": ["Insuficiencia cardiaca progresiva", "Fibrilacion auricular", "Tromboembolia y ACV embolico", "Endocarditis infecciosa", "Muerte subita en estenosis aortica severa sintomatica"],
    "criteriosAlarma": ["Sincope en estenosis aortica", "Angina de reposo", "Disnea brusca severa", "Embolismo sistemico (ACV, isquemia aguda de extremidad)", "Endocarditis: fiebre con soplo nuevo"],
    "emergencyLevel": "moderado",
    "relatedPathologyIds": ["pat_icc", "pat_hta", "pat_icc"],
    "isPremium": True
  },
  {
    "id": "pat_miocardiopatia",
    "nombre": "Miocardiopatia Dilatada",
    "bodySystemId": "cardiovascular",
    "definicion": "Enfermedad del miocardio caracterizada por dilatacion y disfuncion sistolica del ventriculo izquierdo (o ambos ventriculos) en ausencia de condiciones de carga anormal o enfermedad coronaria que justifique el grado de disfuncion observado.",
    "epidemiologia": "Prevalencia de 1/2500 en la poblacion general. Causa del 25-30% de los transplantes cardiacos. Mortalidad del 20-25% a los 5 anos con tratamiento optimo. Es la miocardiopatia mas frecuente.",
    "factoresRiesgo": ["Historia familiar (25-35% de casos son geneticos)", "Alcoholismo cronico (cardiomiopatia alcoholica)", "Quimioterapia cardiotoxica (antraciclinas, trastuzumab)", "Miocarditis viral previa", "Embarazo (cardiomiopatia periparto)", "Enfermedades autoinmunes", "Deficiencia de tiamina, selenio o carnitina"],
    "fisiopatologia": "La lesion miocardica primaria produce disfuncion de cardiomiocitos con perdida de contractilidad. El VI se dilata y la fraccion de eyeccion se reduce (<40%). La activacion del sistema neurohormonas (SRAA, sistema simpatico) intenta compensar pero produce remodelado adverso con mayor dilatacion y fibrosis intersticial. El resultado es IC progresiva con riesgo de muerte subita por arritmias ventriculares.",
    "signosYSintomas": {
      "signos": ["Cardiomegalia en Rx (indice cardiotorax > 0.55)", "Tercer ruido cardiaco (galope ventricular)", "Estertores crepitantes bibasales", "Ingurgitacion yugular", "Edemas con godet", "Pulso alternante", "Soplo de regurgitacion mitral funcional"],
      "sintomas": ["Disnea de esfuerzo progresiva (principal sintoma)", "Ortopnea y disnea paroxistica nocturna", "Fatiga cronica severa", "Palpitaciones (taquicardia, extrasistoles)", "Sincope en arritmias malignas", "Angina atipica"]
    },
    "clasificacion": {
      "nombre": "Clasificacion etiologica",
      "tipos": [
        {"nombre": "Idiopatica", "descripcion": "Sin causa identificable; diagnostico de exclusion"},
        {"nombre": "Genetica familiar", "descripcion": "Mutaciones en genes de proteinas del sarcomero o citoesqueleto"},
        {"nombre": "Inflamatoria/viral", "descripcion": "Secundaria a miocarditis; causas: Enterovirus, VIH, Chagas (endemica en Latinoamerica)"},
        {"nombre": "Toxica", "descripcion": "Alcoholismo, cocaina, antraciclinas, trastuzumab"},
        {"nombre": "Metabolica", "descripcion": "Deficiencias nutricionales, hipotiroidismo, feocromocitoma"}
      ]
    },
    "diagnostico": {
      "anamnesis": ["Historia familiar de miocardiopatia o muerte subita", "Consumo de alcohol (cantidad y tiempo)", "Quimioterapia cardiotoxica previa", "Infeccion viral reciente precedente", "Embarazo reciente (periparto)"],
      "examenFisico": ["Auscultacion: 3er ruido, soplo mitral funcional, estertores", "Ingurgitacion yugular y reflujo hepatoyugular", "Edema con godet bilateral", "Cardiomegalia palpable (latido apical desplazado)"],
      "pruebas": [
        {"nombre": "Ecocardiograma transtorax", "descripcion": "Define dilatacion ventricular, FEVI reducida y disfuncion sistolica global", "valoresReferencia": "DTSVI > 55 mm; FEVI < 40%; sin alteraciones segmentarias", "cuidadosEnfermeria": ["No requiere preparacion", "Posicionar en decubito lateral izquierdo", "Documentar resultado para comparacion evolutiva"]},
        {"nombre": "BNP / NT-proBNP", "descripcion": "Marcador de estres de pared ventricular; guia tratamiento y pronostico", "valoresReferencia": "BNP > 100 pg/mL sugiere IC; > 400 IC probable", "cuidadosEnfermeria": ["No requiere ayuno", "Resultado rapido orienta tratamiento urgente"]},
        {"nombre": "Resonancia magnetica cardiaca", "descripcion": "Gold standard: caracteriza tejido miocardico, detecta fibrosis (realce tardio de gadolinio)", "valoresReferencia": "Realce tardio de gadolinio indica fibrosis y mayor riesgo de arritmias", "cuidadosEnfermeria": ["Verificar ausencia de contraindicaciones para gadolinio (funcion renal)", "Retirar objetos metalicos", "Informar al paciente sobre duracion (45-60 min en tubo cerrado)"]},
        {"nombre": "Holter de 24h", "descripcion": "Detecta arritmias ventriculares y auriculares que guian indicacion de DAI", "valoresReferencia": "Mas de 1000 extrasistoles ventriculares en 24h = significativo", "cuidadosEnfermeria": ["Colocar electrodos correctamente", "Indicar al paciente que lleve diario de actividades y sintomas", "Retirar dispositivo al dia siguiente"]}
      ]
    },
    "tratamientoMedico": {
      "objetivos": ["Reducir mortalidad mediante tratamiento neurohormonas", "Mejorar clase funcional y calidad de vida", "Prevenir muerte subita con DAI si FEVI < 35%", "Tratar la causa subyacente si es identificable"],
      "farmacologico": [
        {"nombre": "Sacubitril/Valsartan (ARNI)", "grupo": "Inhibidor de neprilisina y receptor de angiotensina", "mecanismo": "Potencia peptidos natriureticos y bloquea SRAA, revirtiendo remodelado cardiaco", "dosis": "Iniciar 24/26 mg cada 12h; titular hasta 97/103 mg cada 12h", "cuidadosEnfermeria": ["NO combinar con IECA (riesgo angioedema): esperar 36h de lavado", "Monitorizar PA: hipotension frecuente al inicio", "Controlar potasio y creatinina", "Reemplaza al IECA en IC con FEVI reducida"]},
        {"nombre": "Carvedilol", "grupo": "Betabloqueante no selectivo", "mecanismo": "Bloquea beta1, beta2 y alfa1; reduce remodelado, mortalidad y muerte subita", "dosis": "3.125 mg c/12h inicial; doblar cada 2 semanas hasta 25-50 mg c/12h", "cuidadosEnfermeria": ["NO iniciar en IC aguda descompensada", "Monitorizar FC y PA", "No suspender abruptamente: riesgo de IC aguda"]},
        {"nombre": "Dapagliflozina", "grupo": "Inhibidor SGLT2", "mecanismo": "Reduce hospitalizations por IC y mortalidad cardiovascular independientemente de diabetes", "dosis": "10 mg/dia VO", "cuidadosEnfermeria": ["Monitorizar glucemia (puede producir hipoglucemia leve)", "Vigilar infecciones urinarias y genitales", "Contraindicada con TFG < 25 mL/min/1.73m2"]},
        {"nombre": "Espironolactona", "grupo": "Antagonista de aldosterona", "mecanismo": "Reduce fibrosis miocardica y retencion de sodio; reduce mortalidad en IC", "dosis": "25-50 mg/dia VO", "cuidadosEnfermeria": ["Monitorizar potasio: riesgo de hiperpotasemia", "Contraindicada con K > 5.0 o creatinina > 2.5 mg/dL", "Vigilar ginecomastia en hombres"]}
      ],
      "noFarmacologico": ["Abstinencia absoluta de alcohol en cardiomiopatia alcoholica", "Restriccion de sodio < 2 g/dia", "Restriccion hidrica 1.5-2 L/dia en IC avanzada", "Rehabilitacion cardiaca supervisada", "Pesar a diario: consultar si aumento > 2 kg en 3 dias"],
      "quirurgico": ["DAI (Desfibrilador Automatico Implantable) si FEVI < 35% a pesar de tratamiento optimo 3 meses", "TRC (Terapia de Resincronizacion Cardiaca) si bloqueo de rama izquierda y FEVI < 35%", "Dispositivo de asistencia ventricular como puente a trasplante", "Trasplante cardiaco en IC terminal refractaria"]
    },
    "cuidadosEnfermeria": {
      "valoracion": ["Monitorizar disnea con escala modificada de Borg", "Peso diario en mismas condiciones", "Balance hidrico estricto", "Evaluar clase funcional NYHA", "Revisar adherencia a medicacion y restricciones"],
      "intervenciones": ["Posicionar en Fowler 30-45 grados", "Administrar medicacion segun esquema", "Monitorizar ECG para detectar arritmias ventriculares", "Educar sobre autocontrol de peso y sintomas", "Coordinar ecocardiograma de control periodico"],
      "educacionPaciente": ["Explicar importancia del tratamiento de cuatro pilares (IECA/ARNI, BB, ARM, SGLT2)", "Instruir en automonitoreo de peso y cuando consultar", "Educacion sobre restriccion de sodio y liquidos", "Signos de alarma que requieren consulta urgente"],
      "monitorizacion": ["Peso diario", "PA y FC cada 8h en hospitalizados", "ECG: buscar extrasistoles ventriculares y BCRI", "Ionograma y funcion renal semanales al inicio", "BNP mensual para monitorizar respuesta"]
    },
    "npiNanda": [
      {"codigo": "00029", "nombre": "Disminucion del gasto cardiaco", "definicion": "Cantidad insuficiente de sangre bombeada", "caracteristicasDefinitorias": ["Disnea", "Taquicardia", "Edema", "FEVI < 40%"], "factoresRelacionados": ["Disfuncion sistolica del ventriculo izquierdo"]},
      {"codigo": "00092", "nombre": "Intolerancia a la actividad", "definicion": "Insuficiencia de energia para completar actividades diarias requeridas", "caracteristicasDefinitorias": ["Disnea de esfuerzo", "Fatiga extrema", "Clase NYHA III-IV"], "factoresRelacionados": ["Desequilibrio oferta-demanda de oxigeno miocardico"]},
      {"codigo": "00002", "nombre": "Desequilibrio nutricional: ingesta inferior a las necesidades", "definicion": "Ingesta de nutrientes insuficiente para satisfacer necesidades metabolicas", "caracteristicasDefinitorias": ["Anorexia cardiaca", "Nauseas", "Perdida de peso no intencionada"], "factoresRelacionados": ["Congestion intestinal por IC", "Medicacion"]}
    ],
    "npiNic": [
      {"codigo": "4040", "nombre": "Cuidados cardiacos", "actividades": ["Monitorizar peso diario y balance hidrico", "Controlar ECG y signos de descompensacion", "Administrar medicacion de 4 pilares"]},
      {"codigo": "0180", "nombre": "Manejo de la energia", "actividades": ["Planificar actividades con periodos de descanso", "Evitar actividades extenuantes", "Coordinar rehabilitacion cardiaca progresiva"]},
      {"codigo": "5510", "nombre": "Educacion para la salud", "actividades": ["Instruir en automonitoreo de peso", "Ensenyar restriccion de sodio y liquidos", "Explicar esquema de 4 farmacos y su importancia"]}
    ],
    "npiNoc": [
      {"codigo": "0400", "nombre": "Efectividad de la bomba cardiaca", "indicadores": ["FEVI en seguimiento estable o mejorando", "Clase NYHA mejorada", "BNP en descenso"], "escala": "1=Desviacion grave, 5=Sin desviacion"},
      {"codigo": "1803", "nombre": "Conocimiento del proceso de la enfermedad", "indicadores": ["Describe correctamente el tratamiento", "Menciona signos de alarma", "Practica automonitoreo de peso"], "escala": "1=Ningun conocimiento, 5=Conocimiento extenso"}
    ],
    "complicaciones": ["Muerte subita por arritmias ventriculares malignas", "IC terminal refractaria", "Tromboembolia (FA, trombos intraventriculares)", "Muerte subita cardiaca"],
    "criteriosAlarma": ["Aumento de peso > 2 kg en 3 dias (descompensacion)", "Disnea en reposo o a minimos esfuerzos", "Sincope o presincope (arritmia maligna)", "FA de nueva aparicion", "SpO2 < 90% en reposo"],
    "emergencyLevel": "moderado",
    "relatedPathologyIds": ["pat_icc", "pat_hta"],
    "isPremium": True
  },
  {
    "id": "pat_arteriopatia_periferica",
    "nombre": "Enfermedad Arterial Periferica",
    "bodySystemId": "cardiovascular",
    "definicion": "Enfermedad aterosclerotica que afecta a las arterias de los miembros inferiores (principalmente), causando estenosis u oclusiones que reducen el flujo sanguineo distal y producen isquemia cronica o aguda.",
    "epidemiologia": "Prevalencia del 3-10% en adultos mayores de 40 anos; aumenta al 15-20% en mayores de 70 anos. El 40-50% de los pacientes con EAP tiene enfermedad coronaria o cerebrovascular concomitante. La amputacion mayor ocurre en el 1-2% anual.",
    "factoresRiesgo": ["Tabaquismo (factor de riesgo mas importante)", "Diabetes mellitus", "Hipertension arterial", "Dislipemia", "Edad avanzada", "Sexo masculino", "Insuficiencia renal cronica", "Hiperhomocisteinemia"],
    "fisiopatologia": "La aterosclerosis produce placas que estenosan progresivamente las arterias iliofemoral y tibial. La reduccion del flujo produce isquemia muscular durante el ejercicio (claudicacion) y, en fases avanzadas, isquemia critica en reposo con riesgo de ulceras y gangrena. El indice tobillo-brazo (ITB) < 0.9 confirma el diagnostico.",
    "signosYSintomas": {
      "signos": ["Ausencia o reduccion de pulsos distales (popliteo, pedio, tibial posterior)", "ITB < 0.9 (diagnostico)", "Palidez o cianosis del pie", "Cambios troficos: perdida de vello, atrofia muscular, engrosamiento de unas", "Ulceras isquemicas en talones o dedos", "Gangrena seca en fases terminales"],
      "sintomas": ["Claudicacion intermitente: dolor muscular con el ejercicio que cede en reposo", "Dolor en reposo en la extremidad distal (isquemia critica)", "Frialdad de la extremidad", "Parestesias (hormigueo, entumecimiento)"]
    },
    "clasificacion": {
      "nombre": "Clasificacion de Fontaine",
      "tipos": [
        {"nombre": "Estadio I", "descripcion": "Asintomatico; ITB < 0.9 sin claudicacion"},
        {"nombre": "Estadio II", "descripcion": "Claudicacion intermitente; IIa > 200 metros; IIb < 200 metros"},
        {"nombre": "Estadio III", "descripcion": "Dolor isquemico en reposo"},
        {"nombre": "Estadio IV", "descripcion": "Necrosis o gangrena; isquemia critica con amenaza de la extremidad"}
      ]
    },
    "diagnostico": {
      "anamnesis": ["Caracteristicas y distancia de claudicacion (metros)", "Tabaquismo: paquetes-anio", "Antecedentes de diabetes, HTA, dislipemia", "Antecedentes de episodios de isquemia aguda"],
      "examenFisico": ["Palpacion de pulsos en cuatro niveles: femoral, popliteo, pedio, tibial posterior", "Medicion del ITB con Doppler", "Inspeccion de la piel: temperatura, coloracion, lesiones", "Busqueda de soplos femorales"],
      "pruebas": [
        {"nombre": "Indice Tobillo-Brazo (ITB)", "descripcion": "Cociente entre la PA sistolica en tobillo y en brazo; prueba de cribado mas utilizada", "valoresReferencia": "Normal 1.0-1.4; EAP leve 0.7-0.9; moderada 0.4-0.7; severa < 0.4", "cuidadosEnfermeria": ["Colocar manguitos en tobillo y brazo", "Usar Doppler continuo de onda en arteria pedia y tibial posterior", "Registrar valor mayor de cada tobillo para calculo"]},
        {"nombre": "Ecografia Doppler arterial", "descripcion": "Localiza y cuantifica las estenosis; mide velocidades de flujo", "valoresReferencia": "Estenosis > 50% cuando la velocidad maxima sistolica se duplica", "cuidadosEnfermeria": ["No requiere preparacion especial", "Evitar vendajes en zona de exploracion"]},
        {"nombre": "Angio-TC o Angio-RMN", "descripcion": "Planificacion preoperatoria: mapea toda la anatomia vascular del miembro", "valoresReferencia": "Detecta estenosis > 50% con alta sensibilidad y especificidad", "cuidadosEnfermeria": ["Verificar funcion renal para contraste yodado en Angio-TC", "Asegurar hidratacion adecuada pre y post contraste", "Registrar alergias a contrastes"]},
        {"nombre": "Perfil lipidico y glucemia", "descripcion": "Evalua y monitoriza factores de riesgo modificables", "valoresReferencia": "LDL objetivo < 70 mg/dL en EAP establecida; glucemia < 130 mg/dL postprandial", "cuidadosEnfermeria": ["Ayuno de 12 horas para lipidos", "Registrar medicacion hipolipemiante actual"]}
      ]
    },
    "tratamientoMedico": {
      "objetivos": ["Reducir riesgo cardiovascular global (IAM, ACV)", "Mejorar distancia de claudicacion", "Prevenir amputacion en isquemia critica", "Control estricto de factores de riesgo"],
      "farmacologico": [
        {"nombre": "Aspirina mas clopidogrel", "grupo": "Antiagregacion plaquetaria", "mecanismo": "Reduce trombosis arterial y eventos cardiovasculares en EAP establecida", "dosis": "Aspirina 100 mg/dia mas Clopidogrel 75 mg/dia", "cuidadosEnfermeria": ["Administrar con alimentos", "Vigilar sangrado digestivo y otros sangrados", "No suspender antes de procedimientos sin consultar al medico"]},
        {"nombre": "Atorvastatina", "grupo": "Estatina de alta intensidad", "mecanismo": "Reduce LDL, estabiliza placa aterosclerotica y reduce eventos cardiovasculares", "dosis": "40-80 mg/dia; objetivo LDL < 70 mg/dL", "cuidadosEnfermeria": ["Administrar de noche para mayor eficacia", "Monitorizar mialgias y CPK", "Controlar perfil lipidico cada 3 meses hasta objetivo"]},
        {"nombre": "Cilostazol", "grupo": "Inhibidor de fosfodiesterasa III", "mecanismo": "Vasodilatacion y antiagregacion; mejora la distancia de claudicacion", "dosis": "100 mg cada 12h en ayunas", "cuidadosEnfermeria": ["Contraindicado en IC con cualquier grado", "Puede producir cefalea y palpitaciones al inicio", "Evaluar mejoria de la distancia caminada a las 12 semanas"]},
        {"nombre": "Ramipril", "grupo": "IECA", "mecanismo": "Reduce eventos cardiovasculares en pacientes con EAP; tambien mejora la claudicacion", "dosis": "5-10 mg/dia", "cuidadosEnfermeria": ["Monitorizar PA y funcion renal", "Vigilar tos seca", "Contraindicado en estenosis bilateral de arterias renales"]}
      ],
      "noFarmacologico": ["Cese absoluto del tabaquismo (medida mas eficaz)", "Programa de ejercicio supervisado (marcha 30-60 min/dia 3 veces/semana)", "Control estricto de diabetes (HbA1c < 7%)", "Control de dislipemia y HTA"],
      "quirurgico": ["Angioplastia transluminal percutanea (ATP) con o sin stent", "Cirugia de bypass aortofemoral o femoropopliteo", "Endarterectomia femoral", "Amputacion en gangrena irreversible o sepsis incontrolable"]
    },
    "cuidadosEnfermeria": {
      "valoracion": ["Palpar pulsos distales bilateralmente y documentar", "Medir ITB con Doppler segun protocolo", "Inspeccionar pie diabetico: lesiones, temperatura, coloracion", "Evaluar distancia de claudicacion y dolor en reposo"],
      "intervenciones": ["Cuidado intensivo de los pies: higiene, hidratacion, corte de unas", "Curar ulceras isquemicas con tecnica esteril", "Elevar cabecera de la cama 15-20 cm (no elevar el pie en isquemia critica)", "Proteger de traumatismos y presion en zonas de riesgo", "Administrar antiagregantes y estatinas segun prescripcion"],
      "educacionPaciente": ["Instruccion detallada en cuidado de pies (inspeccion diaria, calzado adecuado)", "Cese del tabaquismo: recursos disponibles, terapia sustitutiva de nicotina", "Programa de ejercicio de marcha progresiva", "Control glucemico y lipidico estrictos", "Cuando consultar urgencias: dolor en reposo, herida que no cicatriza, pie frio o negro"],
      "monitorizacion": ["Pulsos distales y temperatura de extremidades diariamente", "ITB periodicamente para evaluar progresion", "Inspeccion de lesiones cutaneas cada turno en hospitalizados", "PA y glucemia segun protocolo"]
    },
    "npiNanda": [
      {"codigo": "00024", "nombre": "Perfusion tisular periferica ineficaz", "definicion": "Disminucion de la circulacion sanguinea periferica que puede comprometer la salud", "caracteristicasDefinitorias": ["Ausencia de pulsos distales", "Claudicacion intermitente", "Cambios troficos del pie", "ITB < 0.9"], "factoresRelacionados": ["Aterosclerosis periferica", "Tabaquismo", "Diabetes mellitus"]},
      {"codigo": "00132", "nombre": "Dolor agudo", "definicion": "Experiencia sensitiva desagradable con dano tisular real o potencial", "caracteristicasDefinitorias": ["Claudicacion al caminar", "Dolor en reposo nocturno en isquemia critica"], "factoresRelacionados": ["Isquemia muscular por estenosis arterial"]},
      {"codigo": "00047", "nombre": "Riesgo de deterioro de la integridad cutanea", "definicion": "Riesgo de alteracion de la piel que puede comprometer la salud", "caracteristicasDefinitorias": ["ITB reducido", "Cambios troficos", "Pie frio"], "factoresRelacionados": ["Isquemia tisular periferica", "Neuropatia diabetica asociada"]}
    ],
    "npiNic": [
      {"codigo": "4070", "nombre": "Precauciones circulatorias", "actividades": ["Monitorizar pulsos distales bilateralmente", "Proteger la extremidad de trauma y presion", "Elevar ligeramente la cabecera del lecho", "No elevar el pie en isquemia critica (empeora perfusion)"]},
      {"codigo": "3590", "nombre": "Vigilancia de la piel", "actividades": ["Inspeccionar pie diariamente en busca de lesiones", "Documentar caracteristicas de ulceras si existen", "Curar lesiones con tecnica esteril"]},
      {"codigo": "5510", "nombre": "Educacion para la salud", "actividades": ["Ensenyar cuidado intensivo del pie", "Motivar cese del tabaquismo con recursos practicos", "Explicar programa de marcha terapeutica"]}
    ],
    "npiNoc": [
      {"codigo": "0407", "nombre": "Perfusion tisular: periferica", "indicadores": ["Pulsos distales palpables", "ITB mejorado o estable", "Ausencia de ulceras nuevas", "Temperatura del pie normal"], "escala": "1=Desviacion grave, 5=Sin desviacion"},
      {"codigo": "1103", "nombre": "Curacion de la herida: por primera intencion", "indicadores": ["Reduccion del area de ulcera", "Ausencia de signos de infeccion", "Formacion de tejido de granulacion"], "escala": "1=No hay evidencia, 5=Extensa evidencia"}
    ],
    "complicaciones": ["Isquemia critica con amenaza de amputacion", "Ulceras isquemicas de evolucion torpida", "Gangrena seca o humeda", "Amputacion mayor del miembro", "Infarto de miocardio y ACV (riesgo cardiovascular global aumentado)"],
    "criteriosAlarma": ["Dolor isquemico en reposo (estadio III: urgencia vascular)", "Pie negro o con gangrena (estadio IV)", "Ulcera con signos de infeccion profunda: fiebre, celulitis, olor fetido", "Perdida brusca de pulso distal (isquemia aguda): las 6 P: Pain, Pallor, Paresthesia, Paralysis, Pulselessness, Poikilothermia"],
    "emergencyLevel": "moderado",
    "relatedPathologyIds": ["pat_hta", "pat_dm2"],
    "isPremium": True
  }
]

with open('F:/programas/Patologias/src/data/pathologies.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

data.extend(new_pathologies)

with open('F:/programas/Patologias/src/data/pathologies.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f'Done. Total pathologies: {len(data)}')
