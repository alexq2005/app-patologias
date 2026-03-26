import json

new_pathologies = [
  # ===== DIGESTIVO =====
  {
    "id": "pat_colecistitis",
    "nombre": "Colecistitis Aguda",
    "bodySystemId": "digestivo",
    "definicion": "Inflamacion aguda de la vesicula biliar, generalmente causada por la obstruccion del conducto cistico por un calculo biliar (colecistitis calculosa, 90-95%). La colecistitis alitiasica (5-10%) ocurre en pacientes criticos.",
    "epidemiologia": "Afecta al 10-15% de la poblacion adulta. Es la complicacion mas frecuente de la colelitiasis. La colecistectomia laparoscopica es una de las cirugias mas realizadas en el mundo.",
    "factoresRiesgo": ["Colelitiasis previa (principal factor)", "Obesidad", "Sexo femenino", "Embarazo y multiparidad", "Edad > 40 anos", "Dieta rica en grasas", "Diabetes mellitus", "Ayuno prolongado (colecistitis alitiasica en UCI)"],
    "fisiopatologia": "La obstruccion del conducto cistico por un calculo produce distension vesicular con aumento de la presion intraluminal. La mucosa inflamada libera fosfolipasas que hidrolizan la lecitina biliar en lisolecitina, irritante de la mucosa. La inflamacion progresa con isquemia de la pared vesicular y riesgo de perforacion. En el 20% se produce sobreinfeccion bacteriana (E. coli, Klebsiella, Enterococcus).",
    "signosYSintomas": {
      "signos": ["Signo de Murphy positivo (dolor a la palpacion en el hipocondrio derecho durante la inspiracion profunda)", "Defensa muscular en hipocondrio derecho", "Fiebre (38-39 grados)", "Taquicardia", "Ictericia leve en el 20% (calculo en coledoco)"],
      "sintomas": ["Dolor en hipocondrio derecho o epigastrio de inicio brusco", "Irradiacion al hombro derecho o escapula (dolor phrenic)", "Nauseas y vomitos", "Intolerancia a alimentos grasos", "Fiebre con escalofrios"]
    },
    "clasificacion": {
      "nombre": "Criterios de Tokio 2018 por severidad",
      "tipos": [
        {"nombre": "Grado I (Leve)", "descripcion": "Sin disfuncion organica; responde al tratamiento medico conservador"},
        {"nombre": "Grado II (Moderada)", "descripcion": "Leucocitosis > 18.000, masa palpable, duracion > 72h o inflamacion local severa"},
        {"nombre": "Grado III (Severa)", "descripcion": "Disfuncion de al menos un organo: hipotension, alteracion neurologica, fallo respiratorio, renal o hepatico"}
      ]
    },
    "diagnostico": {
      "anamnesis": ["Antecedente de colicos biliares previos", "Inicio y caracteristicas del dolor: intensidad, irradiacion", "Intolerancia a grasas", "Fiebre y escalofrios"],
      "examenFisico": ["Signo de Murphy: palpacion profunda en hipocondrio derecho durante inspiracion", "Temperatura: fiebre moderada", "Busqueda de ictericia escleral"],
      "pruebas": [
        {"nombre": "Ecografia abdominal", "descripcion": "Primera prueba de eleccion: detecta calculos, engrosamiento de pared vesicular (> 4 mm), liquido perivesicular y signo de Murphy ecografico", "valoresReferencia": "Pared vesicular > 4 mm, calculo impactado en infundibulo", "cuidadosEnfermeria": ["Ayuno de 6-8h para optima visualizacion de la vesicula", "Posicionar en decubito lateral izquierdo o supino"]},
        {"nombre": "Hemograma con formula leucocitaria", "descripcion": "Leucocitosis con neutrofilia indica inflamacion bacteriana; leucocitosis > 18.000 = grado II", "valoresReferencia": "Leucocitos normales 4.500-11.000; neutrofilia > 75%", "cuidadosEnfermeria": ["No requiere ayuno especifico", "Extraer antes del inicio de antibioticos"]},
        {"nombre": "Perfil hepatico y amilasa", "descripcion": "Detecta coledocolitiasis (elevacion de bilirrubina, FA y GGT) y pancreatitis asociada (amilasa)", "valoresReferencia": "Bilirrubina total < 1.2 mg/dL; FA < 120 UI/L; Amilasa < 100 UI/L", "cuidadosEnfermeria": ["Ayuno previo para lipidos si se solicita perfil completo", "Registrar hora de extraccion"]}
      ]
    },
    "tratamientoMedico": {
      "objetivos": ["Control del dolor e inflamacion", "Prevencion de complicaciones", "Colecistectomia laparoscopica en las primeras 72h (tratamiento definitivo)"],
      "farmacologico": [
        {"nombre": "Ceftriaxona", "grupo": "Cefalosporina de 3ra generacion", "mecanismo": "Antibiotico de amplio espectro activo contra germenes entéricos gramnegativos causantes de infeccion vesicular", "dosis": "1-2 g IV cada 24h durante 3-5 dias", "cuidadosEnfermeria": ["Administrar en 30 min IV diluida en 100 mL SF", "Verificar alergias a cefalosporinas y penicilinas", "Cultivo de bilis durante la cirugia para ajuste posterior"]},
        {"nombre": "Metronidazol", "grupo": "Antibiotico nitroimidazol antianaer?bico", "mecanismo": "Cubre anaerobios como Bacteroides fragilis en infecciones biliares complicadas", "dosis": "500 mg IV cada 8h", "cuidadosEnfermeria": ["Administrar en 30-60 min IV", "Avisar al paciente sobre la intolerancia al alcohol (efecto disulfiram)", "Vigilar nauseas y sabor metalico"]},
        {"nombre": "Ketorolaco", "grupo": "AINE analgesico parenteral", "mecanismo": "Inhibe COX reduciendo el dolor viseceral y la inflamacion de la pared vesicular", "dosis": "15-30 mg IV cada 6-8h (no mas de 5 dias)", "cuidadosEnfermeria": ["Vigilar sangrado digestivo y funcion renal", "Contraindicado con insuficiencia renal", "Usar como adyuvante de opioides en dolor severo"]}
      ],
      "noFarmacologico": ["Dieta absoluta hasta cirugia o mejoria clinica", "Hidratacion IV con suero fisiologico o Ringer lactato", "Analgesia adecuada (no contraindicada por morfina)", "Colecistostomia percutanea en pacientes de alto riesgo quirurgico como puente"],
      "quirurgico": ["Colecistectomia laparoscopica en las primeras 24-72h (tratamiento de eleccion)", "Colecistectomia abierta en complicaciones: perforacion, peritonitis"]
    },
    "cuidadosEnfermeria": {
      "valoracion": ["Evaluar dolor con escala NRS: localizacion, irradiacion, intensidad", "Monitorizar temperatura cada 4-6h (fiebre indica infeccion activa)", "Valorar signos peritoneales: defensa, rigidez, Blumberg", "Controlar frecuencia cardiaca y PA: taquicardia por dolor o sepsis"],
      "intervenciones": ["Mantener dieta absoluta y via venosa permeable para hidratacion", "Administrar analgesicos y antibioticos segun prescripcion", "Monitorizar balance hidrico", "Preparacion preoperatoria para colecistectomia laparoscopica", "Informar al paciente sobre el procedimiento quirurgico"],
      "educacionPaciente": ["Explicar la naturaleza calculosa y la necesidad de cirugia", "Dieta pobre en grasas hasta la cirugia y durante la recuperacion", "Cuidado de la herida laparoscopica postoperatoria", "Signos de alarma post-cirugia: fiebre, dolor abdominal, ictericia"],
      "monitorizacion": ["Temperatura cada 4-6h", "Signos vitales cada 4h", "Signos de peritonitis en cada valoracion", "Diuresis si se administran antibioticos nefrotoxicos"]
    },
    "npiNanda": [
      {"codigo": "00132", "nombre": "Dolor agudo", "definicion": "Experiencia sensitiva desagradable asociada con inflamacion vesicular", "caracteristicasDefinitorias": ["Dolor en hipocondrio derecho", "Signo de Murphy positivo", "Taquicardia", "Posicion antialgica"], "factoresRelacionados": ["Inflamacion de la pared vesicular", "Distension vesicular por calculo impactado"]},
      {"codigo": "00002", "nombre": "Desequilibrio nutricional: ingesta inferior a las necesidades", "definicion": "Ingesta insuficiente de nutrientes", "caracteristicasDefinitorias": ["Dieta absoluta indicada", "Nauseas y vomitos"], "factoresRelacionados": ["Dieta absoluta terapeutica", "Intolerancia digestiva por inflamacion"]},
      {"codigo": "00004", "nombre": "Riesgo de infeccion", "definicion": "Riesgo de ser invadido por organismos patogenos", "caracteristicasDefinitorias": ["Inflamacion vesicular con posible sobreinfeccion"], "factoresRelacionados": ["Estasis biliar", "Isquemia de la pared vesicular"]}
    ],
    "npiNic": [
      {"codigo": "1400", "nombre": "Manejo del dolor", "actividades": ["Evaluar dolor cada 4h con escala NRS", "Administrar analgesicos y antiespasmódicos segun prescripcion", "Monitorizar eficacia del tratamiento analgesico"]},
      {"codigo": "6540", "nombre": "Control de infecciones", "actividades": ["Administrar antibioticos segun protocolo", "Monitorizar temperatura y recuento leucocitario", "Vigilar signos de peritonitis o colangitis"]},
      {"codigo": "1080", "nombre": "Manejo de la eliminacion gastrointestinal", "actividades": ["Mantener dieta absoluta segun indicacion", "Hidratacion IV", "Valorar reintroduccion de dieta tras cirugia"]}
    ],
    "npiNoc": [
      {"codigo": "2102", "nombre": "Nivel del dolor", "indicadores": ["Dolor < 3/10 con analgesia", "Ausencia de signo de Murphy", "FC < 100 lpm"], "escala": "1=Grave, 5=Ningun"},
      {"codigo": "0703", "nombre": "Severidad de la infeccion", "indicadores": ["Afebril", "Leucocitos en rango normal", "Sin signos peritoneales"], "escala": "1=Grave, 5=Ninguna"}
    ],
    "complicaciones": ["Perforacion vesicular con peritonitis biliar", "Colangitis ascendente (urgencia)", "Empiema vesicular", "Fistula colecisto-duodenal con ilieo biliar", "Colecistitis enfisematosa (gas en pared vesicular)"],
    "criteriosAlarma": ["Fiebre > 39 grados con escalofrios (colangitis)", "Ictericia progresiva (coledocolitiasis)", "Signos peritoneales: rigidez abdominal, Blumberg positivo (perforacion)", "Hipotension (sepsis biliar)", "Ausencia de mejoria a las 72h con tratamiento medico"],
    "emergencyLevel": "moderado",
    "relatedPathologyIds": ["pat_pancreatitis"],
    "isPremium": True
  },
  {
    "id": "pat_hepatitis",
    "nombre": "Hepatitis Viral",
    "bodySystemId": "digestivo",
    "definicion": "Inflamacion del higado causada por virus hepatotropos (VHA, VHB, VHC, VHD, VHE), con espectro clinico desde formas asintomaticas hasta hepatitis fulminante con insuficiencia hepatica aguda.",
    "epidemiologia": "VHB: 290 millones de portadores cronicos; 820.000 muertes/ano por cirrosis y hepatocarcinoma. VHC: 58 millones de portadores cronicos; 290.000 muertes/ano. VHA: mas de 1.4 millones de casos agudos/ano; forma epidemica en paises en desarrollo.",
    "factoresRiesgo": ["VHA/VHE: agua o alimentos contaminados, viajes a areas endemicas, hacinamiento", "VHB: relaciones sexuales sin proteccion, uso de drogas IV, transmision vertical madre-hijo, personal sanitario", "VHC: uso de drogas IV (principal factor en paises desarrollados), transfusiones previas a 1992, procedimientos medicos invasivos en areas endemicas"],
    "fisiopatologia": "Los virus hepatotropos infectan los hepatocitos. El dano hepatico es principalmente inmunomediado: los linfocitos T CD8+ reconocen antigenos virales en la superficie de los hepatocitos e inducen apoptosis. En la infeccion cronica por VHB y VHC, la inflamacion persistente produce fibrosis progresiva (cicatrices) que puede evolucionar a cirrosis en 20-30 anos.",
    "signosYSintomas": {
      "signos": ["Ictericia escleroconjuntival y cutanea", "Hepatomegalia dolorosa a la palpacion", "Orina de color oscuro (coluria)", "Heces decoloradas (acolia) en colestasis", "Signos de insuficiencia hepatica en formas graves: encefalopatia, ascitis, equimosis"],
      "sintomas": ["Fase preterica: astenia, anorexia, nauseas, fiebre (sindrome gripal)", "Coluria y acolia (inicio de la ictericia)", "Dolor en hipocondrio derecho", "Prurito en colestasis", "Artralgias y mialgias (VHB: sindrome serumlike)"]
    },
    "clasificacion": {
      "nombre": "Clasificacion por agente etiologico",
      "tipos": [
        {"nombre": "Hepatitis A", "descripcion": "RNA virus picornavirus; transmision fecal-oral; aguda autolimitada; nunca cronifica; vacuna disponible"},
        {"nombre": "Hepatitis B", "descripcion": "DNA virus hepadnavirus; transmision parenteral, sexual y vertical; cronifica en 5-10% adultos, 90% neonatos; vacuna disponible"},
        {"nombre": "Hepatitis C", "descripcion": "RNA virus flavivirus; transmision parenteral (ADVP); cronifica en 70-80%; curable con antivirales de accion directa"},
        {"nombre": "Hepatitis D", "descripcion": "RNA virus defectivo; solo en coinfeccion con VHB; la coinfeccion aguda VHB+VHD es autolimitada; la superinfeccion VHD en portador VHB es grave"},
        {"nombre": "Hepatitis E", "descripcion": "RNA virus; transmision fecal-oral; severa en embarazadas (mortalidad 20%); zoonosis en paises desarrollados (cerdo)"}
      ]
    },
    "diagnostico": {
      "anamnesis": ["Antecedentes epidemiologicos: viajes, contactos, practica sexual de riesgo, drogas IV", "Vacunacion previa frente a VHA y VHB", "Tiempo de evolucion y sintomas prodromicos", "Medicacion (hepatitis medicamentosa en diagnostico diferencial)"],
      "examenFisico": ["Grado de ictericia (esclerotical, cutanea)", "Tamano y consistencia del higado (hepatomegalia blanda en hepatitis aguda)", "Signos de hipertension portal (ascitis, circulacion colateral)", "Encefalopatia hepatica: flapping tremor, desorientacion"],
      "pruebas": [
        {"nombre": "Perfil hepatico completo (transaminasas, bilirrubina, GGT, FA)", "descripcion": "Cuantifica el dano hepatocelular y el grado de colestasis", "valoresReferencia": "ALT normal < 40 UI/L; en hepatitis viral aguda puede superar 1000-5000 UI/L", "cuidadosEnfermeria": ["Extraer en ayunas de 4-6h", "Registrar hora y condiciones de extraccion", "Serie de transaminasas para monitorizar la evolucion"]},
        {"nombre": "Serologia viral completa", "descripcion": "Identifica el agente etiologico y el estadio de la infeccion: AgHBs, anti-HBs, IgM anti-HBc, anti-HCV, IgM anti-HAV, AgHBe", "valoresReferencia": "AgHBs positivo = infeccion activa por VHB; IgM anti-HBc = infeccion aguda; anti-HCV positivo = contacto con VHC (confirmar con PCR)", "cuidadosEnfermeria": ["No requiere ayuno para serologia", "Registrar el resultado para la notificacion epidemiologica obligatoria"]},
        {"nombre": "Carga viral (PCR VHB o VHC)", "descripcion": "Cuantifica la replicacion viral; guia la indicacion y la respuesta al tratamiento antiviral", "valoresReferencia": "VHB: ADN < 2000 UI/mL = portador inactivo; > 20.000 = hepatitis activa. VHC: ARN detectable confirma infeccion activa", "cuidadosEnfermeria": ["Mantener muestra a temperatura adecuada", "Resultado puede tardar 2-7 dias"]},
        {"nombre": "Tiempo de protrombina (TP) y albumina", "descripcion": "Evaluan la funcion de sintesis hepatica; fundamentales para detectar insuficiencia hepatica aguda", "valoresReferencia": "TP < 70% o INR > 1.5 indica afectacion de la sintesis hepatica", "cuidadosEnfermeria": ["En hepatitis fulminante: extraer urgente", "Un TP < 40% con encefalopatia = criterio de trasplante urgente"]}
      ]
    },
    "tratamientoMedico": {
      "objetivos": ["En hepatitis aguda: soporte y monitorizacion; prevencion de hepatitis fulminante", "En VHC cronica: erradicacion viral con antivirales de accion directa (curacion en > 95%)", "En VHB cronica: supresion viral de por vida; prevenir cirrosis y hepatocarcinoma"],
      "farmacologico": [
        {"nombre": "Sofosbuvir + Velpatasvir (antivirales directos para VHC)", "grupo": "Antivirales de accion directa (AAD) pangenotipicos", "mecanismo": "Sofosbuvir inhibe la polimerasa NS5B del VHC; velpatasvir inhibe NS5A; combinacion sinergica con alta barrera genetica a la resistencia", "dosis": "Un comprimido al dia durante 12 semanas (todos los genotipos)", "cuidadosEnfermeria": ["Verificar respuesta virologica sostenida (RVS) con PCR a las 12 semanas post-tratamiento", "Vigilar interacciones: amiodarona contraindicada con sofosbuvir", "Eficacia > 95%: ensenyar que es curable para mejorar la adherencia"]},
        {"nombre": "Tenofovir disoproxil (TAF o TDF) para VHB cronica", "grupo": "Analogo de nucleotido inhibidor de la polimerasa VHB", "mecanismo": "Inhibe la ADN polimerasa viral; alta barrera genetica a la resistencia; de por vida en la mayoria", "dosis": "TAF 25 mg/dia o TDF 300 mg/dia VO", "cuidadosEnfermeria": ["Monitorizar funcion renal y densidad osea con TDF (mas nefrotoxicidad)", "TAF tiene mejor perfil renal y oseo", "Adherencia estricta: la supresion viral previene cirrosis y hepatocarcinoma"]},
        {"nombre": "N-acetilcisteina IV (hepatitis fulminante)", "grupo": "Antioxidante y precursor de glutathion", "mecanismo": "Repone glutathion hepatico y actua como antioxidante en la necrosis hepatica masiva; indicado principalmente en insuficiencia hepatica por paracetamol", "dosis": "150 mg/kg en 60 min, luego 50 mg/kg en 4h, luego 100 mg/kg en 16h", "cuidadosEnfermeria": ["Preparar con glucosa 5% segun protocolo", "Vigilar reacciones anafilactoides en la primera hora (mas frecuentes)", "En caso de reaccion: detener infusion, administrar antihistaminico y reiniciar mas lentamente"]}
      ],
      "noFarmacologico": ["Reposo relativo durante la fase aguda ictérica", "Dieta hepatoprotectora: evitar alcohol absolutamente, reducir grasas", "Hidratacion oral o IV en caso de intolerancia oral", "Notificacion epidemiologica obligatoria y rastreo de contactos", "Vacunacion de contactos (VHA y VHB)"],
      "quirurgico": ["Trasplante hepatico urgente en insuficiencia hepatica aguda fulminante (criterios del Kings College)"]
    },
    "cuidadosEnfermeria": {
      "valoracion": ["Monitorizar diariamente transaminasas, TP y bilirrubina en hepatitis aguda moderada-severa", "Evaluar nivel de consciencia: flapping tremor y desorientacion indican encefalopatia", "Valorar ictericia: escala de coloracion de la piel y escleras", "Controlar diuresis y edemas (fallo hepatico avanzado)"],
      "intervenciones": ["Precauciones de aislamiento segun via de transmision (entérico para VHA, universal para VHB/VHC)", "Administrar antivirales segun prescripcion y adherencia", "Control estricto de la via venosa (VHC y VHB: evitar contaminacion)", "Reposo en cama durante la fase ictérica aguda", "Notificacion a salud publica segun protocolo"],
      "educacionPaciente": ["Abstinencia absoluta de alcohol durante y despues de la hepatitis", "Medidas de prevencion de transmision segun el virus: uso de preservativos en VHB/VHC, higiene de manos en VHA", "Importancia de la adherencia al tratamiento antiviral en VHC y VHB cronica", "En VHC: explicar que es curable con tratamiento completo", "No donar sangre, organos ni tejidos"],
      "monitorizacion": ["Transaminasas y TP diario en fase aguda severa", "Nivel de consciencia cada 4-8h en hepatitis severa", "Peso y diuresis diarios si hay ascitis", "PCR viral a las 12 semanas post-tratamiento de VHC (RVS)"]
    },
    "npiNanda": [
      {"codigo": "00178", "nombre": "Gestion ineficaz de la propia salud", "definicion": "Patron de regulacion del regimen terapeutico inadecuado", "caracteristicasDefinitorias": ["Dificultad con el tratamiento antiviral de larga duracion", "Consumo continuado de alcohol"], "factoresRelacionados": ["Complejidad del tratamiento", "Dependencia al alcohol"]},
      {"codigo": "00188", "nombre": "Tendencia a adoptar conductas de riesgo para la salud", "definicion": "Incapacidad para modificar el estilo de vida", "caracteristicasDefinitorias": ["Continua con conductas de riesgo para transmision del virus"], "factoresRelacionados": ["Falta de conocimiento sobre modos de transmision"]},
      {"codigo": "00132", "nombre": "Dolor agudo", "definicion": "Experiencia sensitiva desagradable", "caracteristicasDefinitorias": ["Dolor en hipocondrio derecho", "Malestar general"], "factoresRelacionados": ["Inflamacion hepatica y hepatomegalia"]}
    ],
    "npiNic": [
      {"codigo": "2080", "nombre": "Manejo de la eliminacion hepatica", "actividades": ["Monitorizar transaminasas y TP diariamente en fase aguda", "Evaluar signos de encefalopatia hepatica", "Restringir proteinas si hay encefalopatia"]},
      {"codigo": "6540", "nombre": "Control de infecciones", "actividades": ["Aplicar precauciones segun via de transmision", "Educar al paciente sobre medidas de prevencion", "Notificar a autoridades sanitarias"]},
      {"codigo": "5510", "nombre": "Educacion para la salud", "actividades": ["Explicar la transmision del virus especifico", "Ensenyar medidas de prevencion de transmision", "Explicar el tratamiento antiviral y su curabilidad en VHC"]}
    ],
    "npiNoc": [
      {"codigo": "0800", "nombre": "Termicidad", "indicadores": ["Afebril", "Transaminasas en descenso progresivo", "Bilirrubina normalizada"], "escala": "1=Desviacion grave, 5=Sin desviacion"},
      {"codigo": "1803", "nombre": "Conocimiento del proceso de la enfermedad", "indicadores": ["Identifica modos de transmision", "Conoce el tratamiento", "Abstinencia de alcohol"], "escala": "1=Ningun conocimiento, 5=Conocimiento extenso"}
    ],
    "complicaciones": ["Hepatitis fulminante con insuficiencia hepatica aguda (VHB, VHE en embarazadas)", "Cirrosis hepatica tras infeccion cronica (VHB, VHC)", "Hepatocarcinoma sobre cirrosis", "Crioglobulinemia mixta en VHC cronica"],
    "criteriosAlarma": ["TP < 40% o INR > 2.5 (insuficiencia hepatica)", "Encefalopatia hepatica: flapping tremor, confusion, desorientacion", "Ascitis de rapida instauracion", "Bilirrubina > 20 mg/dL", "Hemorragia digestiva alta (varices esofagicas en cirrosis)"],
    "emergencyLevel": "moderado",
    "relatedPathologyIds": ["pat_cirrosis"],
    "isPremium": True
  },
  {
    "id": "pat_diverticulitis",
    "nombre": "Diverticulitis",
    "bodySystemId": "digestivo",
    "definicion": "Inflamacion o infeccion de uno o mas diverticulos del colon, formaciones saculares adquiridas de la mucosa y submucosa que protruyen a traves de la pared muscular del colon. La localizacion mas frecuente es el colon sigmoide.",
    "epidemiologia": "La diverticulosis (presencia de diverticulos sin inflamacion) afecta al 5-10% de adultos > 40 anos, aumentando al 65% en mayores de 85 anos. El 10-25% de los portadores de diverticulosis desarrollaran diverticulitis a lo largo de su vida.",
    "factoresRiesgo": ["Edad avanzada (> 50 anos)", "Dieta baja en fibra", "Estrenimiento cronico y esfuerzo defecatorio", "Obesidad", "Sedentarismo", "Consumo de carne roja", "AINEs y corticoides (aumentan el riesgo de perforacion)", "Tabaquismo"],
    "fisiopatologia": "Los diverticulos se forman en los puntos de mayor debilidad de la pared colica (donde penetran los vasa recta). La microperfuracion de un diverticulo por impacto fecal o por isquemia focal produce inflamacion pericolica. En la mayoria de los casos esta contenida por el tejido pericólico (diverticulitis no complicada). En el 15-20% se producen complicaciones: absceso, peritonitis, fistula o estenosis.",
    "signosYSintomas": {
      "signos": ["Defensa muscular en fosa iliaca izquierda", "Masa palpable en FII si hay absceso pericólico", "Fiebre (37.5-38.5 grados)", "Signos de peritonitis en formas complicadas: rigidez abdominal, Blumberg"],
      "sintomas": ["Dolor en fosa iliaca izquierda (signo cardinal)", "Cambios en el ritmo intestinal: diarrea o estrenimiento", "Nauseas y vomitos", "Disuria y polaquiuria si hay inflamacion sobre la vejiga (fistula vesicocolica)", "Fiebre con escalofrios en formas complicadas"]
    },
    "clasificacion": {
      "nombre": "Clasificacion de Hinchey modificada",
      "tipos": [
        {"nombre": "Estadio Ia", "descripcion": "Inflamacion pericolica confinada sin absceso; tratamiento antibiotico ambulatorio u hospitalario"},
        {"nombre": "Estadio Ib", "descripcion": "Absceso pericólico confinado < 4 cm; antibioticos IV hospitalarios"},
        {"nombre": "Estadio II", "descripcion": "Absceso pélvico o intraabdominal > 4 cm; drenaje percutaneo mas antibioticos"},
        {"nombre": "Estadio III", "descripcion": "Peritonitis purulenta generalizada por perforacion cubierta; cirugia urgente"},
        {"nombre": "Estadio IV", "descripcion": "Peritonitis fecal por perforacion libre; cirugia urgente de Hartmann"}
      ]
    },
    "diagnostico": {
      "anamnesis": ["Dolor en FII de inicio progresivo en horas", "Episodios previos de dolor similar", "Cambio en el ritmo intestinal", "Fiebre y malestar general"],
      "examenFisico": ["Palpacion: defensa voluntaria o involuntaria en FII", "Temperatura: fiebre moderada", "Signos peritoneales en formas complicadas", "Tacto rectal: dolor en la cara lateral izquierda"],
      "pruebas": [
        {"nombre": "TC abdominal con contraste", "descripcion": "Gold standard diagnostico: detecta engrosamiento de la pared colica, inflamacion pericólica, abscesos y perforacion libre", "valoresReferencia": "Engrosamiento pared > 4 mm con inflamacion pericólica = criterio diagnostico", "cuidadosEnfermeria": ["Verificar funcion renal y alergias al contraste yodado", "Hidratacion pre y post contraste", "No requiere preparacion intestinal especial"]},
        {"nombre": "PCR y hemograma", "descripcion": "Marcadores de inflamacion: PCR > 150 mg/L y leucocitosis sugieren complicacion", "valoresReferencia": "PCR > 50 mg/L orienta a diverticulitis; > 150 mg/L sugiere absceso o perforacion", "cuidadosEnfermeria": ["Extraer antes del inicio de antibioticos", "Repetir PCR a las 72h para evaluar respuesta"]},
        {"nombre": "Colonoscopia (diferida 6-8 semanas post-episodio agudo)", "descripcion": "Confirma el diagnostico, descarta cancer colorrectal y evalua la extension de la diverticulosis", "valoresReferencia": "No realizar en fase aguda por riesgo de perforacion", "cuidadosEnfermeria": ["Programar colonoscopia 6-8 semanas despues del episodio agudo", "Preparacion colonica completa el dia previo"]}
      ]
    },
    "tratamientoMedico": {
      "objetivos": ["Resolver el episodio agudo", "Prevenir complicaciones", "Prevencion de recurrencias con dieta rica en fibra", "Cirugia electiva en casos seleccionados con episodios recurrentes"],
      "farmacologico": [
        {"nombre": "Amoxicilina-clavulanico", "grupo": "Antibiotico de amplio espectro", "mecanismo": "Cubre la flora colica: gramnegativos entéricos y anaerobios causantes de diverticulitis", "dosis": "Ambulatorio: 875/125 mg cada 12h VO 7 dias. Hospitalario: 1-2 g IV cada 8h", "cuidadosEnfermeria": ["Administrar IV en 30 min diluido en 100 mL SF", "Vigilar diarrea por Clostridium difficile con uso prolongado", "Verificar tolerancia oral antes de cambio VO"]},
        {"nombre": "Ciprofloxacino + Metronidazol", "grupo": "Antibioticos combinados para flora entérica", "mecanismo": "Ciprofloxacino cubre gramnegativos; metronidazol cubre anaerobios; combinacion de primera linea alternativa", "dosis": "Ciprofloxacino 500 mg cada 12h VO + Metronidazol 500 mg cada 8h VO por 7-10 dias", "cuidadosEnfermeria": ["Administrar con alimentos para reducir intolerancia digestiva", "No consumir alcohol con metronidazol", "Ciprofloxacino puede producir tendinitis en ancianos"]}
      ],
      "noFarmacologico": ["Dieta absoluta o liquida en fase aguda", "Hidratacion IV en hospitalizados", "Reposo relativo", "Drenaje percutaneo de abscesos > 4 cm guiado por TC o ecografia", "Dieta rica en fibra (> 25 g/dia) en la prevencion de recurrencias"],
      "quirurgico": ["Cirugia de Hartmann urgente en peritonitis fecal o purulenta (Hinchey III-IV)", "Sigmoidectomia electiva laparoscopica en episodios recurrentes (> 2 episodios/ano) o complicaciones (estenosis, fistula)"]
    },
    "cuidadosEnfermeria": {
      "valoracion": ["Evaluar dolor en FII con escala NRS y signos peritoneales en cada turno", "Monitorizar temperatura cada 4-6h", "Valorar tolerancia oral para determinar inicio de dieta", "Detectar signos de deterioro: aumento del dolor, rigidez abdominal, hipotension"],
      "intervenciones": ["Dieta absoluta o liquida segun indicacion medica", "Hidratacion IV con solucion balanceada", "Administrar antibioticos IV segun prescripcion y protocolo", "Preparacion del paciente para TC con contraste (via venosa, consntimiento)", "Si hay drenaje percutaneo: cuidado y registro de la cantidad y caracteristicas del drenaje"],
      "educacionPaciente": ["Dieta rica en fibra (25-30 g/dia) para prevenir recurrencias: frutas, verduras, cereales integrales", "Importancia de la hidratacion y el ejercicio regular", "Cuando consultar: aumento del dolor, fiebre alta, cambios en el ritmo intestinal", "Colonoscopia de control obligatoria tras el episodio agudo"],
      "monitorizacion": ["Signos vitales cada 4-6h", "Temperatura para detectar bacteriemia", "Signos peritoneales en cada turno", "Hemograma y PCR al ingreso y a las 48-72h"]
    },
    "npiNanda": [
      {"codigo": "00132", "nombre": "Dolor agudo", "definicion": "Experiencia sensitiva desagradable por inflamacion colonica", "caracteristicasDefinitorias": ["Dolor en FII", "Defensa muscular", "Fiebre", "Taquicardia"], "factoresRelacionados": ["Inflamacion pericolica por microperfuracion diverticular"]},
      {"codigo": "00196", "nombre": "Motilidad gastrointestinal disfuncional", "definicion": "Aumento, disminucion, ineficacia o carencia de actividad peristáltica gastrointestinal", "caracteristicasDefinitorias": ["Cambio en el ritmo intestinal", "Nauseas", "Distension abdominal"], "factoresRelacionados": ["Inflamacion del colon sigmoide"]},
      {"codigo": "00004", "nombre": "Riesgo de infeccion", "definicion": "Riesgo de ser invadido por organismos patogenos", "caracteristicasDefinitorias": ["Microperfuracion diverticular con flora entérica"], "factoresRelacionados": ["Perforacion contenida de diverticulo colico"]}
    ],
    "npiNic": [
      {"codigo": "1400", "nombre": "Manejo del dolor", "actividades": ["Evaluar dolor con NRS cada 4h", "Administrar analgesicos segun prescripcion", "Vigilar progresion del dolor como indicador de complicacion"]},
      {"codigo": "6540", "nombre": "Control de infecciones", "actividades": ["Administrar antibioticos segun protocolo y ajuste por cultivos", "Monitorizar temperatura y leucocitos", "Vigilar signos de peritonitis en cada turno"]},
      {"codigo": "1080", "nombre": "Manejo gastrointestinal", "actividades": ["Mantener dieta absoluta en fase aguda", "Iniciar liquidos claros cuando mejore el dolor", "Progresar dieta segun tolerancia"]}
    ],
    "npiNoc": [
      {"codigo": "2102", "nombre": "Nivel del dolor", "indicadores": ["Dolor FII < 3/10 con tratamiento", "Ausencia de defensa muscular", "Afebril"], "escala": "1=Grave, 5=Ningun"},
      {"codigo": "0703", "nombre": "Severidad de la infeccion", "indicadores": ["Afebril a las 48-72h", "PCR en descenso", "Sin signos de peritonitis"], "escala": "1=Grave, 5=Ninguna"}
    ],
    "complicaciones": ["Absceso pericólico o pélvico", "Peritonitis purulenta o fecal (emergencia)", "Fistula vesicocolica o colovaginal", "Estenosis colica con obstruccion intestinal", "Hemorragia diverticular masiva"],
    "criteriosAlarma": ["Dolor abdominal difuso con rigidez de tabla (peritonitis)", "Hipotension o taquicardia (sepsis)", "Incapacidad para tolerar liquidos", "No respuesta a antibioticos a las 72h", "Neumoperitoneo en radiografia (perforacion libre)"],
    "emergencyLevel": "moderado",
    "relatedPathologyIds": [],
    "isPremium": True
  },
  {
    "id": "pat_reflujo",
    "nombre": "Enfermedad por Reflujo Gastroesofagico (ERGE)",
    "bodySystemId": "digestivo",
    "definicion": "Condicion en la que el contenido gastrico refluy hacia el esofago produciendo sintomas molestos o complicaciones. Se produce por la disfuncion del esfinter esofagico inferior (EEI) y los mecanismos antirreflujo normales.",
    "epidemiologia": "Prevalencia del 10-30% en la poblacion occidental (una de las enfermedades digestivas mas frecuentes). El 40% de los adultos experimenta pirosis al menos una vez al mes. El esofago de Barrett complica el 10-15% de los casos de ERGE cronica.",
    "factoresRiesgo": ["Obesidad (principal factor modificable)", "Hernia hiatal por deslizamiento", "Embarazo", "Tabaquismo", "Consumo de alcohol", "Dieta: chocolate, menta, café, comidas grasas y picantes", "Medicamentos: antagonistas del calcio, anticolinergicos, benzodiacepinas", "Gastroparesia", "Esclerodermia"],
    "fisiopatologia": "El EEI normal mantiene una presion de reposo de 15-30 mmHg que evita el reflujo. En la ERGE, la presion del EEI esta reducida o hay relajaciones transitorias inapropiadas del EEI (causa mas frecuente). El reflujo del acido clorhidrico produce esofagitis quimica. En el esofago de Barrett, el epitelio escamoso esofagico se reemplaza por epitelio columnar metaplasico, con riesgo de adenocarcinoma esofagico.",
    "signosYSintomas": {
      "signos": ["Erosiones en esofago distal en endoscopia", "Esofago de Barrett: cambio de epitelio en la union esofagogastrica", "Estenosis esofagica en ERGE cronica no tratada", "Laringitis posterior (faringe roja en exploracion)"],
      "sintomas": ["Pirosis (ardor retroesternal): sintoma cardinal", "Regurgitacion acida (liquido amargo en la boca)", "Disfagia leve (estenosis esofagica en casos avanzados)", "Sintomas extraesofagicos: tos cronica nocturna, disfonía, asma exacerbada", "Dolor toracico atipico no cardiaco"]
    },
    "clasificacion": {
      "nombre": "Clasificacion de Los Angeles (endoscopica)",
      "tipos": [
        {"nombre": "Grado A", "descripcion": "Erosiones < 5 mm en la mucosa esofagica"},
        {"nombre": "Grado B", "descripcion": "Erosiones > 5 mm sin confluencia entre los pliegues mucosos"},
        {"nombre": "Grado C", "descripcion": "Erosiones confluentes entre pliegues pero que afectan < 75% de la circunferencia"},
        {"nombre": "Grado D", "descripcion": "Erosiones que afectan >= 75% de la circunferencia esofagica"}
      ]
    },
    "diagnostico": {
      "anamnesis": ["Frecuencia y severidad de la pirosis (> 2 veces/semana = ERGE)", "Factores desencadenantes: postprandial, decubito, alimentos especificos", "Disfagia (indicacion de endoscopia urgente)", "Sintomas de alarma: perdida de peso, hemorragia, anemia"],
      "examenFisico": ["El examen fisico suele ser normal", "Valorar IMC: obesidad como factor principal", "Signos de esofagitis severa o complicaciones en casos avanzados"],
      "pruebas": [
        {"nombre": "Endoscopia digestiva alta (EDA)", "descripcion": "Evalua la mucosa esofagica, grado de esofagitis y presencia de esofago de Barrett o estenosis. Indicada en sintomas de alarma o falta de respuesta a tratamiento empirico", "valoresReferencia": "Clasificacion de Los Angeles en caso de esofagitis; biopsias en el esofago de Barrett", "cuidadosEnfermeria": ["Ayuno de 8h previo", "Via venosa y monitorizacion durante la sedacion", "Vigilar post-procedimiento: disfagia, fiebre, dolor abdominal"]},
        {"nombre": "pHmetria esofagica de 24h o impedanciometria", "descripcion": "Confirma el diagnostico objetivo de ERGE cuando la endoscopia es normal; cuantifica los episodios de reflujo acido y no acido", "valoresReferencia": "Exposicion acida > 4.5% del tiempo total = ERGE patologico", "cuidadosEnfermeria": ["Insertar sonda nasofaingea con el electrodo y confirmar posicion por Rx", "Instruir al paciente en el diario de sintomas durante las 24h", "Retirar la sonda al dia siguiente"]},
        {"nombre": "Manometria esofagica de alta resolucion", "descripcion": "Mide la presion del EEI y la funcion peristaltica; descarta acalasia antes de cirugia antirreflujo", "valoresReferencia": "Presion integrada de relajacion (IRP) > 15 mmHg en acalasia; presion EEI < 10 mmHg en ERGE", "cuidadosEnfermeria": ["Ayuno de 6h", "Lubrificar sonda con gel xilcaina", "El estudio dura 30-45 min"]}
      ]
    },
    "tratamientoMedico": {
      "objetivos": ["Aliviar los sintomas y mejorar la calidad de vida", "Cicatrizar la esofagitis", "Prevenir complicaciones: esofago de Barrett, estenosis, adenocarcinoma"],
      "farmacologico": [
        {"nombre": "Omeprazol (IBP)", "grupo": "Inhibidor de la bomba de protones", "mecanismo": "Bloquea irreversiblemente la ATPasa H+/K+ de la celula parietal gastrica, reduciendo la secrecion acida en > 90%", "dosis": "20-40 mg en ayunas 30 min antes del desayuno; en esofagitis grave 40 mg cada 12h", "cuidadosEnfermeria": ["Administrar 30-60 min antes del desayuno para maxima eficacia", "Uso prolongado: vigilar hipomagnesemia y riesgo de fractura osea", "Informar que la pirosis puede reaparecer dias tras la suspension (rebote)"]},
        {"nombre": "Alginato sodico (Gaviscon)", "grupo": "Antiacido de barrera", "mecanismo": "Forma una balsa viscosa flotante en el estomago que evita fisicamente el reflujo postprandial; util como adyuvante o en ERGE no acida", "dosis": "10-20 mL o 2 comprimidos mascados despues de cada comida y al acostarse", "cuidadosEnfermeria": ["Indicar que se tome despues de las comidas (no antes)", "Util para alivio inmediato de la pirosis postprandial", "Seguro en embarazo como primera linea"]},
        {"nombre": "Domperidona", "grupo": "Procinético (antagonista D2 periférico)", "mecanismo": "Aumenta el tono del EEI y acelera el vaciamiento gastrico, reduciendo el tiempo de contacto del acido con el esofago", "dosis": "10 mg 3 veces al dia antes de las comidas", "cuidadosEnfermeria": ["Vigilar prolongacion del QTc (ECG previo si hay factores de riesgo cardiovascular)", "Contraindicado con antifungicos azolicos y macrolidos", "Uso limitado a < 4 semanas en ficha tecnica por riesgo cardiaco"]}
      ],
      "noFarmacologico": ["Reduccion de peso en pacientes obesos (principal medida modificable)", "Elevar la cabecera de la cama 15-20 cm (no solo almohadas)", "Evitar comidas 2-3h antes de acostarse", "Eliminar alimentos desencadenantes: café, alcohol, chocolate, citricos, grasas", "Cese del tabaquismo"],
      "quirurgico": ["Fundoplicatura de Nissen laparoscopica (envuelve el fondo gastrico alrededor del EEI) en ERGE severa o dependiente de IBP en pacientes jovenes", "Tratamiento endoscopico de la estenosis esofagica (dilatacion con balon)"]
    },
    "cuidadosEnfermeria": {
      "valoracion": ["Evaluar frecuencia e intensidad de la pirosis (escala NRS)", "Valorar disfagia: progresion, tipo de alimentos que la producen", "Registrar habitos dietéticos y posturales del paciente", "Evaluar IMC y peso corporal"],
      "intervenciones": ["Administrar IBP 30 min antes del desayuno segun indicacion", "Educar sobre medidas posturales: cabecera elevada al dormir", "Asesoramiento nutricional: alimentos a evitar", "Preparar para endoscopia cuando este indicada"],
      "educacionPaciente": ["Explicar la importancia de las medidas higienico-dietéticas como tratamiento de primera linea", "Elevar la cabecera de la cama: uso de cunas bajo las patas de la cama (no solo almohadas)", "Evitar cenas copiosas y acostarse inmediatamente tras comer", "Cuando consultar: disfagia progresiva, perdida de peso, vomitos con sangre"],
      "monitorizacion": ["Sintomas con el tratamiento (pirosis, regurgitacion)", "Peso mensual para seguimiento de la reduccion", "Si tiene esofago de Barrett: endoscopia de vigilancia segun protocolo (cada 1-3 anos)"]
    },
    "npiNanda": [
      {"codigo": "00132", "nombre": "Dolor agudo", "definicion": "Experiencia sensitiva desagradable", "caracteristicasDefinitorias": ["Pirosis retroesternal", "Regurgitacion acida", "Dolor postprandial"], "factoresRelacionados": ["Reflujo de contenido acido al esofago", "Disfuncion del esfinter esofagico inferior"]},
      {"codigo": "00002", "nombre": "Desequilibrio nutricional: ingesta inferior a las necesidades", "definicion": "Ingesta insuficiente por disfagia", "caracteristicasDefinitorias": ["Evitacion de alimentos por miedo al dolor", "Perdida de peso"], "factoresRelacionados": ["Disfagia por estenosis esofagica en ERGE cronica"]},
      {"codigo": "00078", "nombre": "Gestion de salud ineficaz", "definicion": "Patron de regulacion del regimen terapeutico inadecuado", "caracteristicasDefinitorias": ["No cumple medidas higienico-dietéticas", "Abandona el IBP cuando mejoran los sintomas"], "factoresRelacionados": ["Falta de conocimiento", "Complejidad de los cambios de estilo de vida"]}
    ],
    "npiNic": [
      {"codigo": "1080", "nombre": "Manejo gastrointestinal", "actividades": ["Educar sobre modificaciones dietéticas especificas", "Indicar la elevacion de la cabecera del lecho", "Administrar IBP 30 min antes del desayuno"]},
      {"codigo": "5510", "nombre": "Educacion para la salud", "actividades": ["Explicar las medidas posturales eficaces (diferencia entre almohada y cuna)", "Ensenyar que alimentos evitar con ejemplos practicos", "Importancia de la perdida de peso en obesos"]}
    ],
    "npiNoc": [
      {"codigo": "2102", "nombre": "Nivel del dolor", "indicadores": ["Pirosis < 2 episodios/semana", "Sin regurgitacion nocturna", "Sin disfagia"], "escala": "1=Grave, 5=Ningun"},
      {"codigo": "1803", "nombre": "Conocimiento del proceso de la enfermedad", "indicadores": ["Conoce los alimentos a evitar", "Practica medidas posturales", "Adhiere al tratamiento con IBP"], "escala": "1=Ningun conocimiento, 5=Conocimiento extenso"}
    ],
    "complicaciones": ["Esofago de Barrett (riesgo de adenocarcinoma)", "Estenosis esofagica peptica", "Ulcera esofagica con hemorragia", "Adenocarcinoma esofagico (sobre Barrett)"],
    "criteriosAlarma": ["Disfagia progresiva (solidos a liquidos)", "Perdida de peso inexplicada > 5%", "Hematemesis o melena", "Anemia ferropenica sin otra causa", "Odinofagia severa (dolor al tragar)"],
    "emergencyLevel": "leve",
    "relatedPathologyIds": [],
    "isPremium": True
  },
  {
    "id": "pat_peritonitis",
    "nombre": "Peritonitis",
    "bodySystemId": "digestivo",
    "definicion": "Inflamacion del peritoneo, la membrana serosa que tapiza la cavidad abdominal y los organos abdominales, causada generalmente por la presencia de bacterias o contenido intestinal en la cavidad peritoneal. Es una emergencia quirurgica con alta mortalidad.",
    "epidemiologia": "La peritonitis secundaria (perforacion de viscera hueca) tiene una mortalidad del 10-40% dependiendo del tiempo de evolucion. La peritonitis espontanea bacteriana (PBE) en cirrosis tiene una mortalidad hospitalaria del 20-30%.",
    "factoresRiesgo": ["Apendicitis aguda perforada (causa mas frecuente de peritonitis secundaria)", "Ulcera peptica perforada", "Diverticulitis perforada", "Obstruccion intestinal con perforacion isquemica", "Cirrosis con ascitis (peritonitis bacteriana espontanea)", "Cirugia abdominal previa (peritonitis postoperatoria)"],
    "fisiopatologia": "La contaminacion peritoneal por bacteria o contenido intestinal activa una respuesta inflamatoria masiva. Las citoquinas proinflamatorias y la traslocacion bacteriana producen vasodilatacion, aumento de la permeabilidad vascular y secuestro de liquido en el tercer espacio (hasta 6-10 L en 24h). La sepsis peritoneal puede progresar rapidamente a shock septico y fallo multiorganico.",
    "signosYSintomas": {
      "signos": ["Rigidez abdominal en tabla (musculo abdominal involuntariamente contraido)", "Silencio abdominal: ausencia de ruidos intestinales (ileus paralitico)", "Signo de Blumberg positivo: dolor a la descompresion brusca", "Fiebre alta (38-40 grados)", "Taquicardia e hipotension en shock septico", "Abdomen en tabla (defensa involuntaria generalizada)"],
      "sintomas": ["Dolor abdominal difuso severo de inicio brusco (perforacion) o progresivo", "Nauseas y vomitos", "Incapacidad para moverse sin empeorar el dolor", "Fiebre con escalofrios intensos", "Agitacion o confusion en shock septico avanzado"]
    },
    "clasificacion": {
      "nombre": "Clasificacion por origen",
      "tipos": [
        {"nombre": "Peritonitis primaria (PBE)", "descripcion": "Sin perforacion de viscera; tipica en cirrosis con ascitis; germenes: E. coli, Klebsiella"},
        {"nombre": "Peritonitis secundaria", "descripcion": "Por perforacion de viscera hueca (apendicitis, ulcera, diverticulo); flora mixta polimicrobiana"},
        {"nombre": "Peritonitis terciaria", "descripcion": "Persistente o recurrente tras cirugia; germenes oportunistas: Candida, Pseudomonas; alta mortalidad"}
      ]
    },
    "diagnostico": {
      "anamnesis": ["Inicio y localizacion del dolor: brusco en perforacion, gradual en peritonitis secundaria a proceso inflamatorio", "Antecedentes de ulcera peptica, diverticulitis, apendicitis o cirrosis", "Cirugia abdominal previa", "Uso de AINEs o corticoides (pueden enmascarar sintomas)"],
      "examenFisico": ["Abdomen en tabla: rigidez involuntaria difusa", "Signo de Blumberg positivo", "Ausencia de peristaltismo (silencio abdominal)", "Signos vitales: fiebre, taquicardia, hipotension"],
      "pruebas": [
        {"nombre": "Radiografia de abdomen en bipedestacion", "descripcion": "Detecta neumoperitoneo: aire libre bajo el diafragma que indica perforacion de viscera hueca", "valoresReferencia": "Presencia de aire subfrenic = perforacion confirmada; ausencia no descarta", "cuidadosEnfermeria": ["Realizar en bipedestacion si el paciente puede", "Si no puede: decubito lateral izquierdo durante 10 min", "Resultado urgente en minutos"]},
        {"nombre": "TC abdominal con contraste (urgente)", "descripcion": "Confirma el diagnostico, localiza el origen de la perforacion, detecta abscesos y cuantifica el derrame libre", "valoresReferencia": "Neumoperitoneo, liquido libre, engrosamiento peritoneal, coleccion purulenta", "cuidadosEnfermeria": ["Urgente: no demorar la cirugia por la TC en paciente inestable", "Verificar funcion renal para contraste", "Monitorizar durante el traslado"]},
        {"nombre": "Paracentesis diagnostica con recuento celular (en PBE)", "descripcion": "En cirrosis con ascitis: PMN > 250 celulas/mL confirma PBE; se toma cultivo del liquido", "valoresReferencia": "PMN > 250/mL en ascitis = PBE diagnostica; iniciar antibiotico sin esperar cultivo", "cuidadosEnfermeria": ["Posicionar en decubito supino o semisedestacion", "Marcar el sitio con ecografia (FII preferiblemente)", "Enviar urgente al laboratorio el liquido peritoneal"]}
      ]
    },
    "tratamientoMedico": {
      "objetivos": ["Control del foco de infeccion mediante cirugia (peritonitis secundaria)", "Antibioticoterapia de amplio espectro urgente", "Resucitacion hemodinámica del shock septico", "Prevencion y tratamiento del fallo multiorganico"],
      "farmacologico": [
        {"nombre": "Piperacilina-tazobactam", "grupo": "Betalactamico de amplio espectro con inhibidor de betalactamasa", "mecanismo": "Cubre germenes gramnegativos entéricos, anaerobios y Staphylococcus causantes de peritonitis secundaria", "dosis": "4.5 g IV cada 6-8h (administrar en 3-4h para maxima eficacia PK/PD)", "cuidadosEnfermeria": ["Administrar la primera dosis antes de la cirugia (profilaxis preseptica)", "Infundir en 3-4h para optimizar el tiempo sobre la CMI", "Controlar funcion renal y electrolitos"]},
        {"nombre": "Cefazolina + Metronidazol (alternativa)", "grupo": "Cefalosporina de 1ra generacion + antianaer?bico", "mecanismo": "Cefazolina cubre gram positivos y algunas enterobacterias; metronidazol cubre anaerobios como Bacteroides fragilis", "dosis": "Cefazolina 1-2 g IV cada 8h + Metronidazol 500 mg IV cada 8h", "cuidadosEnfermeria": ["Administrar la primera dosis antes de la cirugia", "Metronidazol: infundir lentamente en 30-60 min", "Vigilar interaccion del metronidazol con alcohol"]},
        {"nombre": "Noradrenalina (en shock septico)", "grupo": "Vasopresor de primera linea en shock septico", "mecanismo": "Vasoconstriccion alfa que restaura la presion de perfusion organica en el shock distributivo septico", "dosis": "0.1-3 mcg/kg/min en infusion continua IV central titulada por PAM > 65 mmHg", "cuidadosEnfermeria": ["Via central obligatoria", "Monitorizar PA invasiva de forma continua con linea arterial", "Objetivo: PAM > 65 mmHg", "Vigilar perfusion distal: extremidades calientes es buen signo"]}
      ],
      "noFarmacologico": ["Resucitacion con cristaloides: 30 mL/kg en las primeras 3h de sepsis grave", "Sonda nasogastrica para descompresion gastrica y evitar broncoaspiracion", "Sonda vesical para medicion de diuresis horaria", "Oxigenoterapia o ventilacion mecanica si shock severo"],
      "quirurgico": ["Laparotomia exploradora urgente con cierre del foco de perforacion", "Colostomia de Hartmann en perforacion colica con peritonitis fecal", "Lavado y drenaje peritoneal intraoperatorio", "Segunda cirugia (second look) a las 48-72h en casos severos"]
    },
    "cuidadosEnfermeria": {
      "valoracion": ["Evaluar el abdomen en cada turno: rigidez, Blumberg, ruidos intestinales", "Monitorizar temperatura, FC, PA y FR cada hora en sepsis", "Medir diuresis horaria (objetivo > 0.5 mL/kg/h)", "Evaluar nivel de consciencia: la confusion indica hipoperfusion cerebral"],
      "intervenciones": ["Preparacion urgente para cirugia: consentimiento, rasurado, via venosa de gran calibre", "Administrar antibioticos IV dentro de la primera hora del diagnostico de sepsis", "Resucitacion hemodinámica agresiva con cristaloides IV", "Colocar sonda nasogastrica y vesical urgente", "Monitorizar parametros de perfusion: lactato, diuresis, nivel de consciencia"],
      "educacionPaciente": ["Dado el estado critico, la educacion es principalmente dirigida a la familia", "Informar a la familia sobre la gravedad, el procedimiento quirurgico urgente y el postoperatorio esperado", "Explicar el postoperatorio en UCI si es necesario"],
      "monitorizacion": ["Signos vitales cada hora en shock", "Diuresis horaria", "Lactato arterial cada 2-4h", "Signos abdominales en cada turno", "Hemograma y PCR diarios"]
    },
    "npiNanda": [
      {"codigo": "00132", "nombre": "Dolor agudo", "definicion": "Experiencia sensitiva desagradable de gran intensidad", "caracteristicasDefinitorias": ["Abdomen en tabla", "Signo de Blumberg positivo", "Taquicardia", "Expresion facial de dolor severo"], "factoresRelacionados": ["Inflamacion peritoneal generalizada por contenido séptico"]},
      {"codigo": "00029", "nombre": "Disminucion del gasto cardiaco", "definicion": "Cantidad insuficiente de sangre bombeada por el corazon", "caracteristicasDefinitorias": ["Hipotension", "Taquicardia", "Oliguria", "Extremidades frias"], "factoresRelacionados": ["Shock septico por peritonitis bacteriana"]},
      {"codigo": "00004", "nombre": "Riesgo de infeccion diseminada", "definicion": "Riesgo de sepsis grave y bacteriemia secundaria", "caracteristicasDefinitorias": ["Foco séptico abdominal", "Bacteriemia documentada o probable"], "factoresRelacionados": ["Perforacion de viscera hueca con contaminacion peritoneal masiva"]}
    ],
    "npiNic": [
      {"codigo": "6654", "nombre": "Vigilancia de la seguridad", "actividades": ["Monitorizar signos de shock septico: hipotension, taquicardia, oliguria", "Evaluar abdomen en cada turno", "Documentar evolucion del dolor abdominal"]},
      {"codigo": "4250", "nombre": "Manejo del shock septico", "actividades": ["Administrar cristaloides 30 mL/kg en la primera hora", "Iniciar antibioticos en < 1h del diagnostico", "Titular vasopresores para PAM > 65 mmHg"]},
      {"codigo": "2900", "nombre": "Asistencia quirurgica", "actividades": ["Preparar al paciente para cirugia urgente", "Documentar medicacion administrada", "Monitorizar continuamente durante el traslado a quirofano"]}
    ],
    "npiNoc": [
      {"codigo": "0400", "nombre": "Efectividad de la bomba cardiaca", "indicadores": ["PAM > 65 mmHg", "Diuresis > 0.5 mL/kg/h", "Lactato en descenso"], "escala": "1=Desviacion grave, 5=Sin desviacion"},
      {"codigo": "0703", "nombre": "Severidad de la infeccion", "indicadores": ["Temperatura normalizada a las 48-72h", "PCR en descenso", "Sin signos de fallo multiorganico"], "escala": "1=Grave, 5=Ninguna"}
    ],
    "complicaciones": ["Shock septico con fallo multiorganico", "Absceso intraabdominal residual post-cirugia", "Fistula enterocutanea", "Ileus paralitico prolongado", "Sindrome abdominal compartimental"],
    "criteriosAlarma": ["Hipotension PA sistolica < 90 mmHg (shock septico)", "Abdomen en tabla de inicio brusco (perforacion libre)", "Oliguria o anuria a pesar de resucitacion", "Lactato > 4 mmol/L (hipoperfusion severa)", "Deterioro del nivel de consciencia"],
    "emergencyLevel": "critico",
    "relatedPathologyIds": ["pat_sepsis", "pat_diverticulitis"],
    "isPremium": True
  }
]

with open('F:/programas/Patologias/src/data/pathologies.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

data.extend(new_pathologies)

with open('F:/programas/Patologias/src/data/pathologies.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f'Done. Total pathologies: {len(data)}')
