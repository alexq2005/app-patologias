import json

new_pathologies = [
  # ===== NEUROLOGICO =====
  {
    "id": "pat_esclerosis_lateral",
    "nombre": "Esclerosis Lateral Amiotrofica (ELA)",
    "bodySystemId": "neurologico",
    "definicion": "Enfermedad neurodegenerativa progresiva que afecta selectivamente a las neuronas motoras superiores (corteza motora) e inferiores (asta anterior medular y nucleos motores del tronco), produciendo paralisis muscular progresiva con preservacion de los sentidos y funciones cognitivas en la mayoria de los casos.",
    "epidemiologia": "Incidencia de 2-3 casos por 100.000 habitantes/ano. Prevalencia de 5-7 casos por 100.000. Supervivencia media de 3-5 anos desde el diagnostico; el 10% supera los 10 anos (caso Stephen Hawking). Mayoria de casos son esporadicos; 5-10% son familiares (mutaciones SOD1, C9orf72, TDP-43).",
    "factoresRiesgo": ["Edad entre 50-70 anos (pico de incidencia)", "Sexo masculino (relacion 1.5:1)", "Historia familiar de ELA o demencia frontotemporal", "Mutaciones geneticas: SOD1, C9orf72, FUS, TDP-43", "Actividad fisica intensa y deporte de alto nivel (factores debatidos)", "Exposicion a metales pesados (plomo, mercurio) como posible factor ambiental"],
    "fisiopatologia": "La agregacion de proteinas mal plegadas (TDP-43, SOD1) produce disfuncion y muerte de neuronas motoras. La perdida de neuronas motoras superiores produce signos piramidales (espasticidad, hiperreflexia) y la perdida de neuronas motoras inferiores produce atrofia y fasciculaciones. La afectacion del musculo se denomina neurogenica (no miopatica). La progresion es inexorable, afectando a musculos bulbares (disfagia, disartria), respiratorios y de las extremidades.",
    "signosYSintomas": {
      "signos": ["Fasciculaciones musculares (contraccion involuntaria visible)", "Atrofia muscular progresiva en areas afectadas", "Hiperreflexia (signo de neurona motora superior)", "Hiporreflexia o arreflexia en areas con atrofia severa", "Signo de Babinski positivo", "Disartria (voz nasal, arrastrada o ininteligible)", "Disfagia con riesgo de broncoaspiracion"],
      "sintomas": ["Debilidad muscular progresiva asimetrica (inicio en una extremidad en el 60%)", "Torpeza en mano dominante o tropiezos frecuentes", "Calambres musculares dolorosos", "Fatiga extrema desproporcional al esfuerzo", "Dificultad para tragar alimentos solidos primero, luego liquidos", "Sensacion de ahogo progresivo en fases avanzadas"]
    },
    "clasificacion": {
      "nombre": "Variantes clinicas",
      "tipos": [
        {"nombre": "ELA clasica (espinal)", "descripcion": "Inicio en extremidades; afectacion mixta de neuronas motoras superiores e inferiores; 70% de los casos"},
        {"nombre": "Variante bulbar", "descripcion": "Inicio con disartria y disfagia; peor pronostico; mas frecuente en mujeres mayores"},
        {"nombre": "ELP (Esclerosis Lateral Primaria)", "descripcion": "Solo neurona motora superior; evolucion mas lenta; mejor pronostico"},
        {"nombre": "AMP (Atrofia Muscular Progresiva)", "descripcion": "Solo neurona motora inferior; supervivencia algo mayor"}
      ]
    },
    "diagnostico": {
      "anamnesis": ["Inicio y progresion de la debilidad (topografia, velocidad)", "Sintomas bulbares: disfagia, disartria, sialorrea", "Historia familiar de ELA o demencia frontotemporal", "Antecedentes de exposicion a metales pesados o actividad deportiva intensa"],
      "examenFisico": ["Examen neurologico completo: fuerza muscular segmentaria, reflejos osteotendinosos", "Inspeccion de fasciculaciones con luz tangencial", "Evaluacion del habla y la deglucion", "Funcion respiratoria: FVC sentado y tumbado"],
      "pruebas": [
        {"nombre": "Electromiografia (EMG) con velocidades de conduccion", "descripcion": "Estudio definitivo: denervacion activa y cronica generalizada en 3 regiones, con conduccion nerviosa sensitiva normal", "valoresReferencia": "Criterios de El Escorial revisados: signos de denervacion en 3 regiones con NCS normales", "cuidadosEnfermeria": ["Preparar la sala y el equipo de EMG", "Informar al paciente que es un procedimiento con agujas finas pero tolerable", "Registrar medicacion actual que pueda interferir"]},
        {"nombre": "RMN cerebral y medular", "descripcion": "Descarta causas compresivas u otras enfermedades; en ELA puede mostrar hiperintensidad en tracto corticoespinal", "valoresReferencia": "Hiperintensidad en tracto corticoespinal en T2 en ELA avanzada", "cuidadosEnfermeria": ["Retirar objetos metalicos", "Informar sobre duracion (45-60 min)", "Verificar contraindicaciones para gadolinio"]},
        {"nombre": "Pruebas de funcion pulmonar (FVC)", "descripcion": "Monitoriza la afectacion de los musculos respiratorios; guia la indicacion de VMNI", "valoresReferencia": "FVC < 50% indica inicio de VMNI; < 30% supervivencia < 6 meses sin soporte ventilatorio", "cuidadosEnfermeria": ["Realizar en sedestacion y en decubito (diferencia > 20% indica debilidad diafragmatica)", "Repetir cada 3 meses en ELA establecida"]},
        {"nombre": "Estudio genetico (SOD1, C9orf72)", "descripcion": "Identifica mutaciones en ELA familiar y en un 10% de los esporadicos; relevancia para consejo genetico y nuevas terapias", "valoresReferencia": "C9orf72 es la mutacion mas frecuente en ELA familiar en Europa", "cuidadosEnfermeria": ["Informar sobre implicaciones del resultado para el paciente y sus familiares", "Garantizar consejo genetico pre y post-test"]}
      ]
    },
    "tratamientoMedico": {
      "objetivos": ["Enlentecer la progresion con neuroprotectores", "Manejar los sintomas (sialorrea, espasticidad, calambres, dolor)", "Mantener la capacidad funcional el mayor tiempo posible", "Soporte ventilatorio y nutricional en fases avanzadas", "Apoyo psicologico y cuidados paliativos desde el diagnostico"],
      "farmacologico": [
        {"nombre": "Riluzol", "grupo": "Neuroprotector glutamatergico", "mecanismo": "Reduce la excitotoxicidad por glutamato bloqueando canales de sodio y reduciendo la liberacion de glutamato", "dosis": "50 mg cada 12h en ayunas o con alimentos", "cuidadosEnfermeria": ["Controlar transaminasas antes del inicio y mensualmente los primeros 3 meses", "Vigilar nauseas y astenia como efectos adversos mas frecuentes", "No hay interaccion significativa con alimentos (puede tomarse con o sin comida)"]},
        {"nombre": "Edaravona", "grupo": "Antioxidante neuroprotector", "mecanismo": "Elimina radicales libres reduciendo el estres oxidativo neuronal; aprobado en ELA de inicio reciente con FVC > 80%", "dosis": "60 mg IV en infusion de 60 min; ciclos de 14 dias on / 14 dias off", "cuidadosEnfermeria": ["Administrar IV con bomba de infusion en 60 min exactamente", "Vigilar reacciones alergicas en las primeras infusiones", "Monitorizar funcion renal (puede elevarse creatinina)"]},
        {"nombre": "Baclofeno", "grupo": "Antiespastico agonista GABA-B", "mecanismo": "Reduce la espasticidad dolorosa inhibiendo la transmision monosinaptica y polisináptica en la medula espinal", "dosis": "5 mg cada 8h titulando hasta 25-50 mg/dia", "cuidadosEnfermeria": ["No suspender abruptamente (riesgo de convulsiones y alucinaciones)", "Vigilar sedacion excesiva, hipotension y debilidad muscular aumentada", "Ajustar dosis en insuficiencia renal"]},
        {"nombre": "Atropina o Escopolamina (para sialorrea)", "grupo": "Anticolinergico", "mecanismo": "Reduce la produccion de saliva inhibiendo las glandulas salivales", "dosis": "Atropina 0.4 mg sublingual cada 4-8h o escopolamina parche 1.5 mg cada 72h", "cuidadosEnfermeria": ["Vigilar retencion urinaria, estrenimiento y confusion en ancianos", "Valorar la eficacia objetivamente (baba en la ropa, cantidad de aspiraciones)"]},
        {"nombre": "Ventilacion mecanica no invasiva (VMNI)", "grupo": "Soporte ventilatorio", "mecanismo": "Asiste la ventilacion en la insuficiencia respiratoria neuromuscular; prolonga la supervivencia y mejora la calidad de vida", "dosis": "Iniciar con uso nocturno cuando FVC < 50% o con sintomas de hipoventilacion nocturna", "cuidadosEnfermeria": ["Adaptar la interfaz (mascarilla nasal o facial) para maxima comodidad", "Ensenyar al paciente y cuidador el manejo del equipo", "Monitorizar SpO2 nocturna y sintomas de hipoventilacion"]}
      ],
      "noFarmacologico": ["Logopedia para disartria y disfagia (tecnicas de comunicacion alternativa)", "Nutricion enteral por gastrostomia endoscopica percutanea (PEG) cuando disfagia severa o perdida de peso > 10%", "Fisioterapia para mantener movilidad, prevenir contracturas y linfedema", "Terapia ocupacional: adaptaciones del hogar, ortesis, silla de ruedas", "Comunicacion aumentativa y alternativa (tableros, ordenadores con seguimiento ocular)"],
      "quirurgico": ["Gastrostomia endoscopica percutanea (PEG) para nutricion enteral", "Traqueotomia en ELA con decision de ventilacion mecanica invasiva permanente (decision personalizada)"]
    },
    "cuidadosEnfermeria": {
      "valoracion": ["Evaluar fuerza muscular con escala MRC en miembros superiores e inferiores", "Monitorizar FVC seriada cada 3 meses", "Evaluar capacidad de deglucion: textura tolerada, peso y estado nutricional", "Valorar SpO2 en reposo y nocturna", "Evaluar comunicacion y estado emocional del paciente y cuidador"],
      "intervenciones": ["Cuidado de la piel y prevension de ulceras por presion", "Aspiracion de secreciones cuando el paciente no puede toser eficazmente", "Cuidados del PEG si tiene gastrostomia: limpieza, comprobacion de posicion", "Manejo de la VMNI: ajuste de interfaz, monitoreo de fugas, alarmas", "Apoyo emocional y coordinacion con trabajo social para recursos de dependencia"],
      "educacionPaciente": ["Explicar la naturaleza progresiva de la enfermedad de forma gradual y adaptada", "Instruir al cuidador principal en manejo de la VMNI, aspiracion y PEG", "Recursos de asociaciones de pacientes con ELA", "Planificacion anticipada de decisiones: testamento vital, preferencias sobre ventilacion invasiva", "Cuidados paliativos: explicar que son compatibles con el tratamiento activo"],
      "monitorizacion": ["FVC cada 3 meses", "SpO2 continua o nocturna segun fase", "Peso y estado nutricional mensual", "Evaluacion de la deglucion con logopeda cada 3-6 meses", "Estado emocional del cuidador: riesgo de sobrecarga"]
    },
    "npiNanda": [
      {"codigo": "00031", "nombre": "Limpieza ineficaz de las vias aereas", "definicion": "Incapacidad para eliminar secreciones del tracto respiratorio", "caracteristicasDefinitorias": ["Incapacidad para toser eficazmente", "Sialorrea con riesgo de broncoaspiracion", "SpO2 reducida"], "factoresRelacionados": ["Debilidad de musculos respiratorios y bulbares por denervacion"]},
      {"codigo": "00103", "nombre": "Deterioro de la deglucion", "definicion": "Funcionamiento anormal del mecanismo de la deglucion", "caracteristicasDefinitorias": ["Tos o atragantamiento al ingerir liquidos", "Tiempo de comida prolongado", "Perdida de peso"], "factoresRelacionados": ["Debilidad de musculos bulbares por ELA"]},
      {"codigo": "00199", "nombre": "Planificacion ineficaz de la actividad", "definicion": "Incapacidad para preparar un conjunto de acciones para satisfacer objetivos de salud", "caracteristicasDefinitorias": ["Dificultad para adaptarse a la progresion de la discapacidad"], "factoresRelacionados": ["Enfermedad progresiva", "Necesidad de adaptaciones ambientales continuas"]}
    ],
    "npiNic": [
      {"codigo": "3160", "nombre": "Aspiracion de vias aereas", "actividades": ["Aspirar secreciones con tecnica esteril cuando el paciente no puede toser", "Monitorizar SpO2 durante la aspiracion", "Evaluar la eficacia de la tos y la necesidad de asistencia mecanica (cough assist)"]},
      {"codigo": "1860", "nombre": "Terapia de deglucion", "actividades": ["Evaluar la seguridad de la deglucion con diferentes texturas", "Posicionar en 90 grados durante las comidas", "Coordinacion con logopeda para tecnicas especificas"]},
      {"codigo": "5270", "nombre": "Apoyo emocional", "actividades": ["Escuchar activamente las preocupaciones del paciente y cuidador", "Facilitar contacto con asociaciones de pacientes con ELA", "Coordinar con psicologo especializado en enfermedades neurodegenerativas"]}
    ],
    "npiNoc": [
      {"codigo": "0403", "nombre": "Estado respiratorio: ventilacion", "indicadores": ["FVC estable o descenso < 10% en 3 meses", "SpO2 > 90% con VMNI", "Sin episodios de broncoaspiracion"], "escala": "1=Desviacion grave, 5=Sin desviacion"},
      {"codigo": "1010", "nombre": "Estado de deglucion", "indicadores": ["Sin episodios de broncoaspiracion", "Mantenimiento del peso con adaptaciones dieteticas o PEG"], "escala": "1=Gravemente comprometido, 5=No comprometido"}
    ],
    "complicaciones": ["Insuficiencia respiratoria por debilidad diafragmatica", "Broncoaspiracion con neumonia aspirativa", "Deshidratacion y desnutricion por disfagia", "Depresion mayor y ansiedad", "Sobrecarga del cuidador"],
    "criteriosAlarma": ["FVC < 50% (indicacion de VMNI urgente)", "Episodio de broncoaspiracion con desaturacion", "Perdida de peso > 10% (indicacion de PEG urgente)", "Disfonia brusca o apneas nocturnas"],
    "emergencyLevel": "moderado",
    "relatedPathologyIds": [],
    "isPremium": True
  },
  {
    "id": "pat_miastenia_gravis",
    "nombre": "Miastenia Gravis",
    "bodySystemId": "neurologico",
    "definicion": "Enfermedad autoinmune de la union neuromuscular caracterizada por debilidad muscular fluctuante y fatigabilidad, causada por anticuerpos contra los receptores de acetilcolina (anti-AChR) o contra MuSK en la placa motora.",
    "epidemiologia": "Prevalencia de 150-200 casos por 100.000 habitantes. Incidencia bifasica: pico en mujeres jovenes (20-40 anos) y en hombres mayores (> 60 anos). La crisis miastenica ocurre en el 15-20% de los pacientes y tiene mortalidad < 5% con tratamiento moderno.",
    "factoresRiesgo": ["Sexo femenino en jovenes", "Timoma (tumor del timo) en 10-15% de los casos", "Hiperplasia timica en jovenes", "Otras enfermedades autoinmunes (tiroiditis, AR, LES)", "Ciertos farmacos: aminoglucosidos, fluoroquinolonas, betabloqueantes (desencadenan crisis)"],
    "fisiopatologia": "Los anticuerpos anti-AChR se unen al receptor de acetilcolina postsinaptico, bloqueandolo y activando el complemento que destruye la placa motora. Con cada estimulo nervioso, la cantidad de ACh disponible se agota progresivamente (fatiga sinaptica), produciendo debilidad que empeora con el ejercicio y mejora con el reposo. La reduccion del numero de receptores funcionales produce la fatigabilidad caracteristica.",
    "signosYSintomas": {
      "signos": ["Ptosis palpebral (cae con el uso del ojo)", "Diplopía (vision doble) por debilidad de musculos extraoculares", "Facies miastenica: expresion aplanada, sonrisa vertical (en rictus)", "Debilidad de musculos bulbares: disartria nasal, disfagia", "Debilidad de musculos proximales de extremidades", "Signo de Cogan (ptosis reaparece tras elevar el parpado manualmente y soltarlo)"],
      "sintomas": ["Debilidad muscular que empeora con el uso y mejora con el reposo (fluctuante)", "Vision doble que mejora al cerrar un ojo", "Dificultad para masticar hacia el final de la comida", "Voz nasal que empeora al hablar prolongadamente", "Dificultad para subir escaleras o levantar objetos al final del dia", "Disnea en crisis miasténica (debilidad de musculos respiratorios)"]
    },
    "clasificacion": {
      "nombre": "Clasificacion MGFA (Myasthenia Gravis Foundation of America)",
      "tipos": [
        {"nombre": "Clase I", "descripcion": "Solo afectacion ocular"},
        {"nombre": "Clase II", "descripcion": "Afectacion leve de musculos distintos a los oculares: IIa (predominio extremidades), IIb (predominio bulbar)"},
        {"nombre": "Clase III", "descripcion": "Afectacion moderada: IIIa (extremidades), IIIb (bulbar)"},
        {"nombre": "Clase IV", "descripcion": "Afectacion severa: IVa (extremidades), IVb (bulbar con sonda nasogastrica)"},
        {"nombre": "Clase V", "descripcion": "Crisis miasténica: intubacion requerida con o sin ventilacion mecanica"}
      ]
    },
    "diagnostico": {
      "anamnesis": ["Patron de debilidad fluctuante y fatigabilidad", "Empeoramiento vespertino y con el esfuerzo", "Historia de ptosis y diplopia variables", "Dificultad para deglutir o hablar al final del dia", "Farmacos que pueden precipitar crisis"],
      "examenFisico": ["Test de ice pack: aplicar hielo en parpado 2 min; mejora de ptosis es positivo para MG", "Test del edrofonio (solo en hospitalizacion por riesgo de bradicardia)", "Evaluacion de la fatigabilidad: mirada sostenida 2 min (ptosis), abduccion sostenida de brazos", "Examen de la via aerea y funcion respiratoria"],
      "pruebas": [
        {"nombre": "Anticuerpos anti-AChR", "descripcion": "Positivos en 85% de MG generalizada y 50% de MG ocular; confirman el diagnostico", "valoresReferencia": "Positivo > 0.5 nmol/L (sensibilidad 85% en MG generalizada)", "cuidadosEnfermeria": ["Extraer muestra venosa", "No requiere ayuno", "Resultado puede tardar 1-2 semanas"]},
        {"nombre": "EMG de fibra unica", "descripcion": "Estudio mas sensible para MG (95%): mide el jitter (variabilidad en la transmision neuromuscular)", "valoresReferencia": "Jitter aumentado y bloqueos de impulso confirman disfuncion de la union neuromuscular", "cuidadosEnfermeria": ["Informar al paciente que es un procedimiento con agujas muy finas", "Suspender anticolinesterasicos 12h antes si es posible (segun indicacion del neurlogo)"]},
        {"nombre": "TC de torax", "descripcion": "Busca timoma o hiperplasia timica; el timoma requiere timectomia", "valoresReferencia": "Masa en mediastino anterior con densidad tejidos blandos", "cuidadosEnfermeria": ["Contraste si se sospecha timoma", "Verificar funcion renal para contraste"]},
        {"nombre": "FVC y PIM (presion inspiratoria maxima)", "descripcion": "Monitoriza la funcion respiratoria para detectar crisis inminente; la regla del 20/30/40", "valoresReferencia": "FVC < 20 mL/kg o PIM < 30 cmH2O = intubacion inminente si tendencia descendente", "cuidadosEnfermeria": ["Realizar en sedestacion y decubito", "Repetir cada 2-4h en hospitalizados con sospecha de crisis", "Registrar tendencia: importa mas la curva que el valor absoluto"]}
      ]
    },
    "tratamientoMedico": {
      "objetivos": ["Controlar los sintomas con anticolinesterasicos", "Inducir remision con inmunosupresores", "Timectomia en casos seleccionados", "Manejo urgente de la crisis miasténica"],
      "farmacologico": [
        {"nombre": "Piridostigmina", "grupo": "Inhibidor de la acetilcolinesterasa", "mecanismo": "Inhibe la colinesterasa en la placa motora, aumentando el tiempo de disponibilidad de ACh en la sinapsis", "dosis": "30-60 mg cada 4-6h VO; dosis maxima 120 mg cada 3h", "cuidadosEnfermeria": ["Administrar con alimentos para reducir efectos muscarinicos: nauseas, diarrea, calambres abdominales", "Vigilar signos de sobredosificacion (crisis colinergica): fasiculaciones, hipersecreciones, bradicardia", "No confundir crisis miasténica con crisis colinergica: opuesta respuesta al edrofonio"]},
        {"nombre": "Prednisona", "grupo": "Corticosteroide inmunosupresor", "mecanismo": "Suprime la produccion de autoanticuerpos y la activacion de linfocitos B; primera linea inmunosupresora", "dosis": "Iniciar 15-20 mg/dia; aumentar lentamente hasta 60-80 mg/dia; reduccion muy lenta", "cuidadosEnfermeria": ["Iniciar con dosis baja y aumentar gradualmente: el inicio brusco puede desencadenar empeoramiento", "Monitorizar glucemia, PA y peso", "Gastroproteccion con omeprazol obligatoria", "Informar que el efecto terapeutico tarda 3-6 meses"]},
        {"nombre": "Azatioprina", "grupo": "Inmunosupresor ahorrador de esteroides", "mecanismo": "Inhibe la sintesis de purinas bloqueando la proliferacion de linfocitos", "dosis": "2-3 mg/kg/dia VO; inicio con 50 mg/dia y titulacion", "cuidadosEnfermeria": ["Verificar actividad de TPMT antes del inicio (riesgo de toxicidad hematologica)", "Hemograma y funcion hepatica mensual el primer anio", "Inicio de efecto a los 12-18 meses de tratamiento"]},
        {"nombre": "Inmunoglobulina IV (IGIV) o Plasmaferesis", "grupo": "Terapia inmunomoduladora rapida para crisis", "mecanismo": "IGIV neutraliza autoanticuerpos; plasmaferesis los elimina fisicamente. Inicio de accion en 3-7 dias.", "dosis": "IGIV 2 g/kg IV en 5 dias o Plasmaferesis: 5 intercambios en 10 dias", "cuidadosEnfermeria": ["IGIV: administrar lentamente con monitoreo de PA y temperatura", "Plasmaferesis: cuidados del acceso vascular (cateter central de doble luz)", "Monitorizar coagulacion y calcio en plasmaferesis", "Ambas son tratamientos de rescate en crisis o pre-timectomia"]}
      ],
      "noFarmacologico": ["Timectomia en todos los pacientes con timoma y en pacientes generalizados menores de 60 anos sin anticuerpos MuSK", "Evitar farmacos que precipitan crisis: aminoglucosidos, fluoroquinolonas, betabloqueantes, magnesio IV", "Educacion sobre factores precipitantes: infecciones, estres, cirugia, embarazo"],
      "quirurgico": ["Timectomia (laparoscopica o robótica transcervical o transesternal)"]
    },
    "cuidadosEnfermeria": {
      "valoracion": ["Monitorizar FVC y PIM cada 2-4h en hospitalizados con crisis o empeoramiento", "Evaluar ptosis y diplopia como indicadores de actividad de la enfermedad", "Vigilar funcion bulbar: calidad del habla y capacidad de deglucion", "Identificar factores precipitantes: infeccion, nuevo farmaco"],
      "intervenciones": ["En crisis miasténica: preparar intubacion si FVC < 20 mL/kg o PIM < 30 cmH2O", "Administrar piridostigmina en horario riguroso para evitar oscilaciones", "Colocar aspirador disponible junto al paciente con disfagia", "Monitorizar disnea y SpO2 continua en hospitalizados", "Elevar cabecera para reducir riesgo de broncoaspiracion"],
      "educacionPaciente": ["Explicar la naturaleza autoinmune de la enfermedad: no tiene causa en el comportamiento del paciente", "Lista de farmacos contraindicados que el paciente debe mostrar a cualquier medico", "Reconocer signos de crisis miasténica y cuando ir a urgencias", "Importancia de adherencia estricta a la medicacion y los controles"],
      "monitorizacion": ["FVC y PIM cada 2-4h en crisis", "SpO2 continua en hospitalizados", "Evaluacion de ptosis, diplopia y habla diariamente en hospitalizados", "Hemograma y funcion hepatica mensual con azatioprina"]
    },
    "npiNanda": [
      {"codigo": "00032", "nombre": "Patron respiratorio ineficaz", "definicion": "Inspiracion o espiracion que no proporciona ventilacion adecuada", "caracteristicasDefinitorias": ["FVC reducida", "Dificultad respiratoria progresiva", "Uso de musculos accesorios"], "factoresRelacionados": ["Debilidad de musculos respiratorios por bloqueo de la union neuromuscular"]},
      {"codigo": "00103", "nombre": "Deterioro de la deglucion", "definicion": "Funcionamiento anormal del mecanismo de la deglucion", "caracteristicasDefinitorias": ["Tos al tragar", "Voz nasal", "Dificultad para masticar al final de la comida"], "factoresRelacionados": ["Debilidad de musculos bulbares fatigables"]},
      {"codigo": "00085", "nombre": "Deterioro de la movilidad fisica", "definicion": "Limitacion del movimiento fisico independiente y voluntario del cuerpo o de una o mas extremidades", "caracteristicasDefinitorias": ["Debilidad proximal de extremidades", "Fatigabilidad con el esfuerzo"], "factoresRelacionados": ["Fatigabilidad neuromuscular autoinmune"]}
    ],
    "npiNic": [
      {"codigo": "3350", "nombre": "Monitorizacion respiratoria", "actividades": ["Medir FVC y PIM cada 2-4h en crisis miasténica", "Preparar equipo de intubacion cuando FVC < 20 mL/kg", "Monitorizar SpO2 y FR continuamente"]},
      {"codigo": "1860", "nombre": "Terapia de deglucion", "actividades": ["Evaluar seguridad de la deglucion en cada comida", "Posicionar a 90 grados durante la alimentacion", "Preparar aspirador disponible durante las comidas"]},
      {"codigo": "6830", "nombre": "Manejo de la urgencia neurologica", "actividades": ["Identificar signos de crisis miasténica: aumento de disnea, FVC descendente", "Administrar IGIV o coordinar plasmaferesis urgente", "Preparar intubacion si FVC cae progresivamente"]}
    ],
    "npiNoc": [
      {"codigo": "0403", "nombre": "Estado respiratorio: ventilacion", "indicadores": ["FVC > 20 mL/kg", "PIM > 30 cmH2O", "Sin requerimiento de ventilacion mecanica"], "escala": "1=Desviacion grave, 5=Sin desviacion"},
      {"codigo": "1010", "nombre": "Estado de deglucion", "indicadores": ["Sin broncoaspiracion", "Ingesta oral adecuada", "Peso estable"], "escala": "1=Gravemente comprometido, 5=No comprometido"}
    ],
    "complicaciones": ["Crisis miasténica (insuficiencia respiratoria aguda)", "Broncoaspiracion y neumonia aspirativa", "Crisis colinergica por sobredosificacion de piridostigmina", "Timoma maligno con invasion local"],
    "criteriosAlarma": ["FVC descendente o < 20 mL/kg (crisis inminente)", "Dificultad respiratoria progresiva o incapacidad para hablar frases completas", "Disfagia total con broncoaspiracion", "Aparicion de nueva debilidad tras introduccion de un farmaco contraindicado"],
    "emergencyLevel": "critico",
    "relatedPathologyIds": [],
    "isPremium": True
  },
  {
    "id": "pat_hipertension_intracraneal",
    "nombre": "Hipertension Intracraneal",
    "bodySystemId": "neurologico",
    "definicion": "Elevacion de la presion intracraneal (PIC) por encima de 20 mmHg de forma sostenida. El craneo es una cavidad rigida con volumen fijo (doctrina de Monro-Kellie), por lo que el aumento de cualquiera de sus componentes (cerebro, sangre, LCR) eleva la PIC y puede producir herniacion cerebral.",
    "epidemiologia": "Complicacion frecuente del traumatismo craneoencefalico grave, ictus hemorragico y meningitis. La hipertension intracraneal idiopatica (pseudotumor cerebri) tiene una incidencia de 0.9 casos por 100.000 habitantes/ano, con predominio en mujeres obesas en edad fertil.",
    "factoresRiesgo": ["Traumatismo craneoencefalico grave", "Hemorragia intracraneal (subaracnoidea, intracerebral, subdural, epidural)", "Tumores intracraneales primarios o metastaticos", "Hidrocefalia obstructiva o comunicante", "Meningitis o encefalitis", "Encefalopatia hepatica", "Hipertension arterial maligna (encefalopatia hipertensiva)", "Obesidad en mujeres jovenes (HIC idiopatica)"],
    "fisiopatologia": "La PIC normal es de 5-15 mmHg. La PIC elevada reduce la presion de perfusion cerebral (PPC = PAM - PIC). Cuando PPC < 60 mmHg se produce isquemia cerebral. La compensacion inicial (desplazamiento de LCR y sangre venosa) se agota rapidamente. La HIC produce herniacion cerebral (cingulada, central o uncal) con compresion del tronco cefalico y posible muerte. Las ondas de Lundberg tipo A (plateau waves > 50 mmHg por 5-20 min) son amenazantes.",
    "signosYSintomas": {
      "signos": ["Triada de Cushing: hipertension + bradicardia + respiracion irregular (signo tardio y alarmante)", "Edema de papila en fondo de ojo", "Paralisis del VI par craneal (diplopia horizontal)", "Alteracion del nivel de consciencia (escala de Glasgow descendente)", "Postura de descerebración o decorticación", "Reflejo de Babinski bilateral"],
      "sintomas": ["Cefalea en caso (holocraneal, matutina, peor en decubito y con Valsalva)", "Nauseas y vomitos en proyectil (sin nausea previa)", "Vision borrosa o diplopia transitoria", "Confusion y somnolencia progresiva", "Acufenos pulsatiles en HIC idiopatica"]
    },
    "clasificacion": {
      "nombre": "Clasificacion por mecanismo y etiologia",
      "tipos": [
        {"nombre": "HIC por aumento de volumen cerebral", "descripcion": "Edema citotoxico (isquemia), edema vasogenico (tumor, trauma), edema intersticial"},
        {"nombre": "HIC por aumento de volumen sanguineo", "descripcion": "Hemorragia intracraneal, trombosis venosa cerebral"},
        {"nombre": "HIC por obstruccion al flujo de LCR", "descripcion": "Hidrocefalia obstructiva o comunicante"},
        {"nombre": "HIC idiopatica (pseudotumor cerebri)", "descripcion": "Aumento de la resistencia a la reabsorcion de LCR sin causa identificable; asociada a obesidad y ciertos farmacos (tetraciclinas, retinoides, vitamina A)"}
      ]
    },
    "diagnostico": {
      "anamnesis": ["Inicio y caracteristicas de la cefalea (peor al levantarse, con maniobras de Valsalva)", "Trauma craneal o cirugia reciente", "Antecedentes de cancer (metastasis)", "Fiebre (infeccion del SNC)", "Farmacologia: tetraciclinas, vitamina A, corticoides en hipereduccion"],
      "examenFisico": ["Escala de Glasgow: nivel de consciencia", "Exploracion de pupilas: tamano, simetria, respuesta a la luz (anisocoria = herniacion uncal)", "Fondo de ojo: edema de papila", "Busqueda de signos meningeos", "Evaluacion de reflejos del tronco cerebral"],
      "pruebas": [
        {"nombre": "TC craneal urgente sin contraste", "descripcion": "Primera prueba de eleccion en urgencias: detecta hemorragia, hidrocefalia, efecto de masa, desplazamiento de la linea media", "valoresReferencia": "Desplazamiento de linea media > 5 mm = HIC severa con riesgo de herniacion", "cuidadosEnfermeria": ["Prioridad urgente: el paciente no puede esperar", "Monitorizar nivel de consciencia y pupilas durante el traslado", "Tener equipo de reanimacion disponible"]},
        {"nombre": "RMN cerebral con y sin contraste", "descripcion": "Mas sensible que la TC para lesiones isquemicas, encefalitis, tumores y trombosis venosa cerebral", "valoresReferencia": "Hiperintensidad en DWI indica isquemia aguda; realce con contraste sugiere tumor o encefalitis", "cuidadosEnfermeria": ["Solo en pacientes estables neurologicamente", "Monitoreo continuo durante el estudio", "Verificar implantes metalicos y marcapasos"]},
        {"nombre": "Monitor de PIC (Camino o cateter ventricular)", "descripcion": "Medicion continua de la presion intracraneal; gold standard en TCE grave y HIC severa en UCI", "valoresReferencia": "PIC normal 5-15 mmHg; tratamiento agresivo si > 20 mmHg sostenido", "cuidadosEnfermeria": ["Cuidado esteril del sitio de insercion", "Calibrar el transductor a nivel del trago auricular", "Registrar valores continua y anotar factores que alteran la PIC (aspiracion, posicion)"]},
        {"nombre": "Puncion lumbar (contraindicada si hay efecto de masa)", "descripcion": "En HIC idiopatica o meningitis sin efecto de masa: mide presion de apertura y analiza el LCR", "valoresReferencia": "Presion de apertura > 25 cmH2O confirma HIC; presion normal 10-20 cmH2O", "cuidadosEnfermeria": ["NUNCA realizar si hay signos de HIC con efecto de masa (riesgo de herniacion)", "Posicionar en decubito lateral con piernas flexionadas", "Medir presion de apertura con manometro antes de extraer LCR"]}
      ]
    },
    "tratamientoMedico": {
      "objetivos": ["Mantener PIC < 20 mmHg y PPC > 60 mmHg", "Tratar la causa subyacente", "Prevenir herniacion cerebral y muerte"],
      "farmacologico": [
        {"nombre": "Manitol hipertonico 20%", "grupo": "Agente hiperosmolar diuretico osmotico", "mecanismo": "Crea gradiente osmotico que extrae agua del cerebro edematizado hacia el plasma, reduciendo el volumen cerebral y la PIC en 15-30 min", "dosis": "0.25-1 g/kg IV en bolo en 15-20 min; se puede repetir cada 4-6h", "cuidadosEnfermeria": ["Administrar con filtro de 5 micras (puede cristalizar)", "Monitorizar osmolaridad plasmatica: no superar 320 mOsm/L (riesgo de toxicidad renal)", "Controlar diuresis: el manitol es muy diuretico", "Vigilar NA y electrolitos tras cada dosis"]},
        {"nombre": "Suero hipertonico (ClNa 3%)", "grupo": "Solucion hiperosmolar", "mecanismo": "Eleva la osmolaridad plasmatica reduciendo el agua cerebral intersticial; mas sostenido que el manitol", "dosis": "100-150 mL de ClNa 3% IV en 20 min, repetir segun PIC y natremia", "cuidadosEnfermeria": ["Administrar SIEMPRE por via central (riesgo de necrosis si extravasacion)", "Monitorizar sodio plasmatico: objetivo 145-155 mEq/L en HIC severa", "Vigilar sobrecarga de volumen"]},
        {"nombre": "Dexametasona", "grupo": "Corticosteroide potente", "mecanismo": "Reduce el edema vasogenico peritumoral; NO tiene eficacia en el edema citotoxico del TCE o isquemia", "dosis": "10 mg IV bolo seguido de 4 mg cada 6h en edema peritumoral por metastasis", "cuidadosEnfermeria": ["SOLO indicada en edema peritumoral neoplasico", "Contraindicada en TCE (estudio CRASH: aumenta mortalidad)", "Controlar glucemia cada 6h: hiperglucemia frecuente"]}
      ],
      "noFarmacologico": ["Elevar la cabecera de la cama 30 grados (reduce la PIC sin comprometer la perfusion)", "Evitar la rotacion y la flexion del cuello (obstaculizan el drenaje venoso yugular)", "Mantener normotermia: la fiebre aumenta el metabolismo cerebral y la PIC", "Sedoanalgesia en ventilacion mecanica: evitar la agitacion y la tos que aumentan la PIC", "Hipocapnia leve (pCO2 35-40 mmHg en ventilacion mecanica): NO usar hiperventilacion agresiva cronica (solo como medida de emergencia por PIC en ascenso)"],
      "quirurgico": ["Drenaje ventricular externo (DVE) para HIC por hidrocefalia: drenaje de LCR", "Craníectomia descompresiva en TCE o infarto maligno con efecto de masa refractario", "Evacuacion del hematoma intracraneal segun localizacion y tamano", "Derivacion ventriculo-peritoneal en hidrocefalia cronica"]
    },
    "cuidadosEnfermeria": {
      "valoracion": ["Monitorizar nivel de consciencia con escala de Glasgow cada hora", "Evaluar pupilas: tamano, simetria y reactividad a la luz en cada control", "Monitorizar signos vitales cada hora (triada de Cushing = alerta maxima)", "Registrar PIC y calcular PPC cuando hay monitor intracraneal", "Detectar signos de herniacion: anisocoria, postura de descerebración"],
      "intervenciones": ["Mantener cabecera elevada a 30 grados estrictamente", "Evitar estimulos dolorosos, ruidos fuertes y la tos que elevan la PIC", "Aspirar con sedacion previa para minimizar el aumento de PIC", "Administrar manitol o suero hipertonico segun prescripcion urgente", "Monitorizar electrolitos, osmolaridad y diuresis despues de agentes hiperosmolares", "Preparar craneotomia de urgencia si hay signos de herniacion"],
      "educacionPaciente": ["La educacion es principalmente a la familia dado el estado critico del paciente", "Explicar a la familia el significado del monitor de PIC y los valores de alarma", "Preparar a la familia para posibles intervenciones quirurgicas urgentes"],
      "monitorizacion": ["PIC continua si hay monitor", "Signos vitales y Glasgow cada hora", "Sodio y osmolaridad cada 4-6h con agentes hiperosmolares", "Pupilas cada hora", "Diuresis horaria con manitol"]
    },
    "npiNanda": [
      {"codigo": "00049", "nombre": "Disminucion de la capacidad adaptativa intracraneal", "definicion": "Mecanismo de compensacion intracraneal dinamico normalmente comprometido por incrementos de volumen intracraneal", "caracteristicasDefinitorias": ["PIC > 20 mmHg", "Alteracion del nivel de consciencia", "Cambios pupilares"], "factoresRelacionados": ["Lesion cerebral con edema", "Hemorragia intracraneal", "Hidrocefalia"]},
      {"codigo": "00002", "nombre": "Deterioro del intercambio gaseoso cerebral", "definicion": "Perfusion cerebral insuficiente", "caracteristicasDefinitorias": ["PPC < 60 mmHg", "Alteracion de la consciencia", "Signos neurologicos focales"], "factoresRelacionados": ["PIC elevada que reduce la presion de perfusion cerebral"]},
      {"codigo": "00085", "nombre": "Deterioro de la movilidad fisica", "definicion": "Limitacion del movimiento fisico", "caracteristicasDefinitorias": ["Hemiparesia o tetraparesia", "Postura anormal"], "factoresRelacionados": ["Lesion cerebral con hipertension intracraneal"]}
    ],
    "npiNic": [
      {"codigo": "2540", "nombre": "Monitorizacion de la presion intracraneal", "actividades": ["Calibrar el transductor a nivel del trago auricular", "Registrar PIC y PPC cada hora", "Identificar ondas de Lundberg tipo A y avisar al medico", "Mantener PPC > 60 mmHg ajustando PAM y PIC"]},
      {"codigo": "2590", "nombre": "Manejo de la presion intracraneal elevada", "actividades": ["Mantener cabecera a 30 grados sin flexion de cuello", "Administrar agentes hiperosmolares segun prescripcion urgente", "Minimizar estimulos que aumentan la PIC", "Documentar respuesta de la PIC a cada intervencion"]},
      {"codigo": "2620", "nombre": "Monitorizacion neurologica", "actividades": ["Evaluar Glasgow, pupilas y signos neurológicos cada hora", "Detectar precozmente signos de herniacion", "Registrar tendencia del Glasgow (descenso es alarmante)"]}
    ],
    "npiNoc": [
      {"codigo": "0909", "nombre": "Estado neurologico", "indicadores": ["Glasgow estable o en mejoria", "Pupilas isocoricas y reactivas", "PIC < 20 mmHg", "PPC > 60 mmHg"], "escala": "1=Gravemente comprometido, 5=No comprometido"},
      {"codigo": "0406", "nombre": "Perfusion tisular: cerebral", "indicadores": ["Glasgow 15", "Ausencia de anisocoria", "PPC > 60 mmHg"], "escala": "1=Desviacion grave, 5=Sin desviacion"}
    ],
    "complicaciones": ["Herniacion cerebral uncal o transtentorial (urgencia vital)", "Isquemia cerebral global o focal por hipoperfusion", "Muerte cerebral", "Diabetes insipida (lesion hipofisaria)", "Sindrome de secrecion inadecuada de ADH (SIADH)"],
    "criteriosAlarma": ["Anisocoria: pupila dilatada y fija unilateral (herniacion uncal)", "Descenso de Glasgow de 2 o mas puntos", "Triada de Cushing: hipertension + bradicardia + respiracion irregular", "PIC > 25 mmHg sostenida a pesar de tratamiento", "Postura de descerebración o decorticacion"],
    "emergencyLevel": "critico",
    "relatedPathologyIds": ["pat_acv", "pat_tceg"],
    "isPremium": True
  },
  {
    "id": "pat_neuralgia_trigemino",
    "nombre": "Neuralgia del Trigemino",
    "bodySystemId": "neurologico",
    "definicion": "Sindrome de dolor orofacial severo caracterizado por episodios de dolor electrico, punzante o en descarga electrica, de inicio y fin bruscos, confinados a una o mas ramas del nervio trigemino (V par craneal), habitualmente desencadenados por estimulos minimos.",
    "epidemiologia": "Incidencia de 4-5 casos por 100.000 habitantes/ano. Mas frecuente en mujeres mayores de 50 anos. Es el sindrome de dolor orofacial mas intenso conocido.",
    "factoresRiesgo": ["Compresion vascular del nervio trigemino (arteria cerebelosa superior)", "Placas de desmielinizacion en nervio trigemino por esclerosis multiple (en jovenes)", "Tumores del angulo pontocerebeloso (neurinoma del acustico)", "Edad avanzada", "Hipertension arterial (vasos tortuosos que comprimen el nervio)"],
    "fisiopatologia": "En la forma clasica, un vaso sanguineo tortuoso (habitualmente la arteria cerebelosa superior) comprime la raiz del nervio trigemino en su entrada en el tronco cerebral, produciendo desmielinizacion focal. Esto genera descargas ectopicas espontaneas y una hipersensibilizacion que hace que estimulos minimos desencadenen paroxismos de dolor intenso.",
    "signosYSintomas": {
      "signos": ["El examen neurologico suele ser normal en la forma clasica", "En esclerosis multiple: alteracion de la sensibilidad facial (signo diferenciador)", "La exploracion de la zona trigger desencadena el dolor (signo diagnostico)"],
      "sintomas": ["Dolor electrico o en descarga en hemicara, unilateral en el 97%", "Duracion de segundos a 2 minutos por paroxismo", "Desencadenado por tocar la cara, masticar, hablar, cepillado de dientes, brisa", "Dolor libre entre paroxismos (diferencia de la neuropatia)", "Rama mas afectada: V2 (mejilla) y V3 (menton) en el 95%", "Periodos de remision de semanas o meses", "Impacto severo en la calidad de vida (puede llevar a desnutricion por miedo a masticar)"]
    },
    "clasificacion": {
      "nombre": "Clasificacion ICHD-3",
      "tipos": [
        {"nombre": "Neuralgia clasica", "descripcion": "Compresion neurovascular demostrada en RMN; 85% de los casos"},
        {"nombre": "Neuralgia secundaria", "descripcion": "Causada por esclerosis multiple (joven, bilateral), tumor del angulo pontocerebeloso"},
        {"nombre": "Neuralgia idiopatica", "descripcion": "Sin causa demostrable en la RMN"}
      ]
    },
    "diagnostico": {
      "anamnesis": ["Caracteristicas del dolor: electrico, punzante, en descarga", "Duracion de cada paroxismo (segundos)", "Factores desencadenantes: masticacion, habla, higiene dental", "Localizacion y rama afectada", "Presencia de dolor constante de fondo (sugiere causa secundaria)"],
      "examenFisico": ["Exploracion sensitiva del territorio trigeminal (tacto, calor, frio)", "Palpacion de la zona trigger (mejilla, nariz, boca)", "Evaluacion de los demas pares craneales", "Auscultacion de soplos vasculares en el cuello"],
      "pruebas": [
        {"nombre": "RMN cerebral con secuencias especiales de nervio craneal (FIESTA/CISS)", "descripcion": "Detecta compresion neurovascular y descarta lesiones secundarias (tumor, placa de EM)", "valoresReferencia": "Contacto o compresion de la raiz trigeminal por un vaso visible en el 80-90% de la forma clasica", "cuidadosEnfermeria": ["No requiere contraste en primera instancia para deteccion de compresion", "Informar sobre duracion del estudio (45-60 min)", "Verificar contraindicaciones para resonancia"]},
        {"nombre": "Potenciales evocados trigeminales", "descripcion": "Detecta retardo en la conduccion trigeminal; util en esclerosis multiple", "valoresReferencia": "Latencia normal del reflejo de parpadeo R1 < 13 ms; R2 < 41 ms", "cuidadosEnfermeria": ["Preparar sala de neurofisiologia", "Informar al paciente sobre el procedimiento y los estimulos electricos leves"]}
      ]
    },
    "tratamientoMedico": {
      "objetivos": ["Reducir la frecuencia e intensidad de los paroxismos", "Mejorar la calidad de vida y la funcion oral", "Considerar cirugia en casos refractarios al tratamiento farmacologico"],
      "farmacologico": [
        {"nombre": "Carbamacepina", "grupo": "Anticonvulsivante estabilizador de membrana", "mecanismo": "Bloquea canales de sodio voltaje-dependientes reduciendo las descargas nerviosas ectopicas del trigémino", "dosis": "100-200 mg/dia titulando hasta 600-1200 mg/dia en 2-3 tomas", "cuidadosEnfermeria": ["Iniciar con dosis bajas y aumentar cada 3-5 dias para tolerancia", "Vigilar hiponatremia (efecto adverso en ancianos)", "Control de hemograma y funcion hepatica al inicio y periodicamente", "Advertir sobre sedacion, vertigo y diplopia al inicio"]},
        {"nombre": "Oxcarbacepina", "grupo": "Anticonvulsivante analogo de carbamacepina", "mecanismo": "Similar mecanismo a carbamacepina con mejor tolerabilidad y menos interacciones farmacologicas", "dosis": "150-300 mg/12h titulando hasta 600-1800 mg/dia", "cuidadosEnfermeria": ["Menor riesgo de hepatotoxicidad que carbamacepina", "Vigilar hiponatremia con mas frecuencia que con carbamacepina", "Mejor tolerada en ancianos"]},
        {"nombre": "Baclofeno", "grupo": "Agonista GABA-B", "mecanismo": "Reduce la excitabilidad del ganglio trigeminal como adyuvante", "dosis": "5-10 mg 3 veces al dia", "cuidadosEnfermeria": ["Util como adyuvante cuando carbamacepina no es suficiente", "Vigilar sedacion excesiva"]},
        {"nombre": "Pregabalina", "grupo": "Ligando alfa-2-delta de canales de calcio", "mecanismo": "Reduce la liberacion de neurotransmisores excitatorios en el ganglio trigeminal", "dosis": "75-150 mg cada 12h", "cuidadosEnfermeria": ["Util como alternativa o en combinacion con carbamacepina", "Vigilar sedacion, edema y ganancia de peso", "Ajustar dosis en insuficiencia renal"]}
      ],
      "noFarmacologico": ["Identificar y evitar los desencadenantes (higiene dental suave, comer en trozos pequenos)", "Mantener nutricion e hidratacion adecuadas (riesgo de desnutricion)", "Apoyo psicologico (alta tasa de depresion y suicidio por el dolor severo)"],
      "quirurgico": ["Descompresion microvascular de Janetta (gold standard): separa el vaso del nervio con una esponja de teflon; 80-90% de remision a 5 anos", "Radiocirugia estereotaxica (Gamma Knife): menos invasiva; 70% de respuesta inicial", "Rizotomia percutanea (lesion del ganglio de Gasser): opcion en ancianos no candidatos a cirugia abierta"]
    },
    "cuidadosEnfermeria": {
      "valoracion": ["Evaluar intensidad del dolor con escala numerica (NRS 0-10) en reposo y con desencadenantes", "Identificar los desencadenantes especificos del paciente", "Valorar estado nutricional: peso, ingesta alimentaria (puede negarse a comer)", "Evaluar impacto emocional: depresion, ansiedad, ideacion suicida"],
      "intervenciones": ["Administrar carbamacepina segun horario estricto con alimentos", "Monitorizar sodio y hemograma con carbamacepina", "Planificar la higiene oral de forma que minimice los estimulos triggerantes", "Ayudar a identificar alimentos blandos tolerados para mantener nutricion", "Coordinar atencion con psicologo si hay afectacion emocional severa"],
      "educacionPaciente": ["Explicar el mecanismo del dolor y los factores desencadenantes", "Importancia de la titulacion lenta de carbamacepina", "No suspender medicacion abruptamente", "Informar sobre opciones quirurgicas cuando el farmaco falla", "Recursos de apoyo psicologico y asociaciones de pacientes"],
      "monitorizacion": ["Sodio plasmatico periodico con carbamacepina", "Hemograma y funcion hepatica con carbamacepina", "Peso y estado nutricional mensual", "Registro de frecuencia de paroxismos para evaluar respuesta al tratamiento"]
    },
    "npiNanda": [
      {"codigo": "00132", "nombre": "Dolor agudo", "definicion": "Experiencia sensitiva desagradable con dano tisular real o potencial", "caracteristicasDefinitorias": ["Paroxismos de dolor electrico en hemicara", "Intensidad NRS 9-10", "Evitacion de actividades desencadenantes"], "factoresRelacionados": ["Compresion neurovascular del nervio trigemino", "Desmielinizacion de la raiz trigeminal"]},
      {"codigo": "00002", "nombre": "Desequilibrio nutricional: ingesta inferior a las necesidades", "definicion": "Ingesta insuficiente de nutrientes", "caracteristicasDefinitorias": ["Evitacion de la masticacion por miedo al dolor", "Perdida de peso", "Ingesta reducida"], "factoresRelacionados": ["Dolor severo desencadenado por la masticacion"]},
      {"codigo": "00124", "nombre": "Desesperanza", "definicion": "Estado subjetivo en el que el individuo percibe pocas o ninguna alternativa", "caracteristicasDefinitorias": ["Expresion de desesperanza ante el dolor", "Depresion reactiva"], "factoresRelacionados": ["Dolor severo e incapacitante de larga evolucion"]}
    ],
    "npiNic": [
      {"codigo": "1400", "nombre": "Manejo del dolor", "actividades": ["Evaluar dolor con NRS antes y despues de medicacion", "Administrar carbamacepina segun horario con alimentos", "Identificar factores desencadenantes y estrategias de evitacion"]},
      {"codigo": "1160", "nombre": "Monitorizacion nutricional", "actividades": ["Pesar semanalmente", "Identificar alimentos tolerados (blandos, temperatura templada)", "Recomendar suplementos nutricionales si hay perdida de peso significativa"]},
      {"codigo": "5270", "nombre": "Apoyo emocional", "actividades": ["Escuchar activamente el impacto del dolor en la vida del paciente", "Evaluar riesgo de depresion y suicidio", "Derivar a psicologo especializado en dolor cronico"]}
    ],
    "npiNoc": [
      {"codigo": "2102", "nombre": "Nivel del dolor", "indicadores": ["Reduccion de la frecuencia de paroxismos", "Duracion reducida con medicacion", "Menos interferencia con actividades diarias"], "escala": "1=Grave, 5=Ningun"},
      {"codigo": "1004", "nombre": "Estado nutricional", "indicadores": ["Peso estable", "Ingesta oral adecuada con alimentos adaptados"], "escala": "1=Desviacion grave, 5=Sin desviacion"}
    ],
    "complicaciones": ["Desnutricion y deshidratacion por evitacion de la masticacion", "Depresion mayor con riesgo de suicidio", "Refractariedad al tratamiento farmacologico (30-50% a largo plazo)"],
    "criteriosAlarma": ["Dolor constante de fondo ademas de los paroxismos (sugiere causa secundaria)", "Alteracion de la sensibilidad facial objetiva (tumor o EM)", "Debut en menores de 50 anos (buscar esclerosis multiple o tumor)", "Ideacion suicida activa por el dolor"],
    "emergencyLevel": "leve",
    "relatedPathologyIds": [],
    "isPremium": True
  },
  {
    "id": "pat_hidrocefalia",
    "nombre": "Hidrocefalia",
    "bodySystemId": "neurologico",
    "definicion": "Acumulacion patologica de liquido cefalorraquideo (LCR) en el sistema ventricular y/o en el espacio subaracnoideo, que produce dilatacion del sistema ventricular (ventriculomegalia) y aumento de la presion intracraneal en la mayoria de los casos.",
    "epidemiologia": "Incidencia de hidrocefalia congenita: 3-4 casos por 1000 nacidos vivos. La hidrocefalia normotensiva del adulto (HNA) tiene una prevalencia del 0.2-2.9% en mayores de 65 anos, siendo subdiagnosticada. La hidrocefalia aguda post-hemorragia subaracnoidea se produce en el 20-30% de los casos.",
    "factoresRiesgo": ["Prematuridad (hemorragia intraventricular neonatal)", "Espina bifida y otras malformaciones del SNC (Chiari, Dandy-Walker)", "Hemorragia subaracnoidea o intraventricular", "Meningitis bacteriana o tuberculosa con adherencias meningeas", "Tumores que obstruyen el flujo de LCR (pineal, tercer ventriculo)", "Estenosis del acueducto de Silvio (congenita o adquirida)", "Edad avanzada en hidrocefalia normotensiva"],
    "fisiopatologia": "El LCR se produce en los plexos coroideos (500 mL/dia), circula desde los ventriculos laterales a traves del III y IV ventriculo al espacio subaracnoideo, y se reabsorbe en las vellosidades aracnoideas. La hidrocefalia obstructiva resulta del bloqueo del flujo de LCR (estenosis del acueducto, tumor). La hidrocefalia comunicante resulta de la alteracion de la reabsorcion (post-hemorragica, post-meningitis). La HNA se produce por reduccion de la distensibilidad cerebral con aumento de la resistencia a la reabsorcion.",
    "signosYSintomas": {
      "signos": ["Macrocefalia en lactantes (suturas abiertas)", "Signo del sol poniente: desviacion conjugada inferior de los ojos en ninos", "Dilatacion de las venas del cuero cabelludo en neonatos", "Signos de HIC en adultos: papiledema, triada de Cushing", "En HNA adulto: marcha magnetica (pasos cortos, pies pegados al suelo)", "Incontinencia urinaria e indiferencia emocional en HNA"],
      "sintomas": ["Cefalea en caso que empeora en las mananas en adultos", "Nauseas y vomitos en proyectil", "Somnolencia y alteracion del nivel de consciencia", "Deficit visual (compresion de las vias opticas)", "Triada de Hakim-Adams en HNA: demencia + alteracion de la marcha + incontinencia urinaria"]
    },
    "clasificacion": {
      "nombre": "Clasificacion por mecanismo y presion",
      "tipos": [
        {"nombre": "Hidrocefalia obstructiva (no comunicante)", "descripcion": "Obstruccion del flujo de LCR dentro del sistema ventricular; causa mas frecuente: estenosis del acueducto"},
        {"nombre": "Hidrocefalia comunicante", "descripcion": "Obstruccion en las cisternas basales o en la reabsorcion aracnoidea; post-hemorragica, post-meningitis"},
        {"nombre": "Hidrocefalia normotensiva (HNA)", "descripcion": "PIC normal o intermitentemente elevada; triada de Hakim-Adams en adultos mayores"},
        {"nombre": "Ex vacuo", "descripcion": "Dilatacion ventricular por atrofia cerebral (no hay HIC); NO es hidrocefalia verdadera"}
      ]
    },
    "diagnostico": {
      "anamnesis": ["Antecedente de hemorragia subaracnoidea, meningitis o tumor", "Evolucion de la cefalea y la alteration del nivel de consciencia", "En HNA: inicio y evolucion de la triada (marcha, memoria, continencia)", "Prematuridad y hemorragia intraventricular en neonatos"],
      "examenFisico": ["Medicion del perimetro cefalico en lactantes y comparacion con tablas", "Palpacion de la fontanela (abombada y tensa = HIC)", "Evaluacion neurologica: nivel de consciencia, marcha, signos cerebelosos", "Fondo de ojo: edema de papila"],
      "pruebas": [
        {"nombre": "TC craneal", "descripcion": "Primera prueba de imagen de eleccion: confirma la dilatacion ventricular y su causa", "valoresReferencia": "Indice de Evans (relacion entre maximo diametro ventricular / diametro intracraneal transverso) > 0.3 confirma hidrocefalia", "cuidadosEnfermeria": ["Urgente si hay signos de HIC o descenso del nivel de consciencia", "Monitorizar nivel de consciencia durante el traslado"]},
        {"nombre": "RMN cerebral", "descripcion": "Mas sensible que la TC: detecta la causa de la obstruccion (estenosis de acueducto, tumor), valoracion del flujo de LCR", "valoresReferencia": "Aqueductal flow void en secuencias de flujo; Hiperintensidad periventricular en T2 en HNA", "cuidadosEnfermeria": ["Solo en pacientes estables", "Verificar contraindicaciones para resonancia"]},
        {"nombre": "Test de infusion de LCR (resistencia a la reabsorcion)", "descripcion": "En HNA: mide la resistencia al flujo de LCR mediante infusion en el espacio subaracnoideo; predice la respuesta a la cirugia", "valoresReferencia": "Resistencia a la reabsorcion > 12 mmHg/mL/min predice respuesta favorable a DVP", "cuidadosEnfermeria": ["Monitorizar al paciente durante la prueba (dura 2-3 horas)", "Registrar presiones de LCR continuamente"]},
        {"nombre": "Test de sustraccion de LCR (tap test)", "descripcion": "En HNA: extraccion de 40-60 mL de LCR por puncion lumbar; mejoria de la marcha en las horas siguientes predice respuesta a la derivacion", "valoresReferencia": "Mejoria > 20% en la velocidad de la marcha a las 2-4h = test positivo", "cuidadosEnfermeria": ["Evaluar la marcha antes y 2-4h despues de la puncion (velocidad y pasos)", "Monitorizar cefalea post-puncion lumbar"]}
      ]
    },
    "tratamientoMedico": {
      "objetivos": ["Reducir la PIC y el volumen ventricular", "Tratar la causa subyacente", "Prevenir el dano neuronal irreversible", "Recuperar la funcion neurologica (especialmente en HNA)"],
      "farmacologico": [
        {"nombre": "Acetazolamida", "grupo": "Inhibidor de la anhidrasa carbonica", "mecanismo": "Reduce la produccion de LCR en los plexos coroideos; medida temporal o en hidrocefalia leve", "dosis": "25 mg/kg/dia en 3 dosis en ninos; 250-1000 mg/dia en adultos", "cuidadosEnfermeria": ["Monitorizar electrolitos: produce acidosis metabolica hiperclorémica y hipopotasemia", "Contraindicada en insuficiencia renal o hepatica", "Medida temporal: no sustituye a la cirugia en hidrocefalia establecida"]},
        {"nombre": "Manitol 20% (en hidrocefalia aguda con HIC)", "grupo": "Agente hiperosmolar", "mecanismo": "Reduce rapidamente el volumen cerebral y la PIC como medida de emergencia mientras se prepara la cirugia", "dosis": "0.5-1 g/kg IV en bolo urgente", "cuidadosEnfermeria": ["Medida de puente hasta la descompresion quirurgica urgente", "Monitorizar osmolaridad y electrolitos", "Administrar con filtro de 5 micras"]}
      ],
      "noFarmacologico": ["Posicion con cabecera a 30 grados", "Drenaje ventricular externo (DVE) de urgencia en hidrocefalia aguda obstructiva con deterioro neurologico"],
      "quirurgico": ["Derivacion ventriculo-peritoneal (DVP): primera linea en hidrocefalia comunicante y HNA; el LCR drena desde el ventriculo lateral al peritoneo por un cateter con valvula", "Ventriculostomia endoscopica del III ventriculo (ETV): alternativa a la DVP en estenosis del acueducto; crea una comunicacion entre el III ventriculo y las cisternas basales", "Drenaje ventricular externo (DVE): temporal en hidrocefalia aguda; permite monitorizar la PIC y drenar LCR", "Derivacion lumbo-peritoneal: en hidrocefalia comunicante o HIC idiopatica"]
    },
    "cuidadosEnfermeria": {
      "valoracion": ["Evaluar nivel de consciencia con escala de Glasgow cada hora en hidrocefalia aguda", "Monitorizar el funcionamiento de la derivacion (DVP): signos de obstruccion o infeccion", "Medir perimetro cefalico diariamente en lactantes", "Evaluar fontanela en neonatos: normalmente plana; abombada = HIC; hundida = hiperdrenaje"],
      "intervenciones": ["Mantener cabecera a 30 grados para facilitar el drenaje venoso", "Cuidado del sitio de cirugia de la derivacion: vigilar eritema, exudado, fiebre (meningitis por DVP)", "Monitorizar signos de malfuncion de la derivacion: cefalea progresiva, nauseas, deterioro del nivel de consciencia", "Cuidado del DVE: mantener el nivel del transductor segun prescripcion, evitar acodamientos del tubo", "Ensenyar a los padres y cuidadores a reconocer signos de disfuncion de la valvula"],
      "educacionPaciente": ["Instruir en el reconocimiento de signos de disfuncion de la derivacion", "Explicar que la derivacion es permanente y requiere vigilancia de por vida", "Actividades a evitar: contacto deportes de golpe en la cabeza", "Planificacion de controles neurologicos periodicos e imagenes de seguimiento"],
      "monitorizacion": ["Glasgow cada hora en hidrocefalia aguda", "Perimetro cefalico diario en lactantes", "Drenaje por DVE: cantidad, color y presion del LCR", "Signos de infeccion en sitio quirurgico", "Signos de disfuncion de DVP a largo plazo"]
    },
    "npiNanda": [
      {"codigo": "00049", "nombre": "Disminucion de la capacidad adaptativa intracraneal", "definicion": "Mecanismo de compensacion intracraneal comprometido", "caracteristicasDefinitorias": ["Ventriculomegalia", "PIC elevada", "Glasgow descendente"], "factoresRelacionados": ["Acumulacion de LCR por obstruccion o falta de reabsorcion"]},
      {"codigo": "00004", "nombre": "Riesgo de infeccion", "definicion": "Riesgo de ser invadido por organismos patogenos", "caracteristicasDefinitorias": ["Derivacion intracraneana", "Sitio quirurgico"], "factoresRelacionados": ["Dispositivo de derivacion implatado (DVP, DVE)", "Cirugia del SNC"]},
      {"codigo": "00085", "nombre": "Deterioro de la movilidad fisica", "definicion": "Limitacion del movimiento fisico", "caracteristicasDefinitorias": ["Marcha magnetica en HNA", "Inestabilidad de la marcha", "Riesgo de caidas"], "factoresRelacionados": ["Hidrocefalia normotensiva con alteracion de circuitos frontales de la marcha"]}
    ],
    "npiNic": [
      {"codigo": "2540", "nombre": "Monitorizacion de la presion intracraneal", "actividades": ["Calibrar DVE al nivel del trago auricular", "Registrar PIC y drenaje de LCR cada hora", "Documentar caracteristicas del LCR: color, turbidez (amarillo o turbio = infeccion)"]},
      {"codigo": "2620", "nombre": "Monitorizacion neurologica", "actividades": ["Evaluar Glasgow, pupilas y signos de HIC cada hora en fase aguda", "Medir perimetro cefalico en lactantes", "Valorar la fontanela en neonatos"]},
      {"codigo": "6550", "nombre": "Proteccion contra las infecciones", "actividades": ["Cuidado esteril del sitio de derivacion", "Vigilar signos de meningitis: fiebre, rigidez de nuca, LCR turbio", "Cambio de apósito segun protocolo"]}
    ],
    "npiNoc": [
      {"codigo": "0909", "nombre": "Estado neurologico", "indicadores": ["Glasgow 15 o en mejoria", "Pupilas isocoricas y reactivas", "Ausencia de cefalea severa"], "escala": "1=Gravemente comprometido, 5=No comprometido"},
      {"codigo": "0703", "nombre": "Severidad de la infeccion", "indicadores": ["Afebril", "LCR claro y sin microorganismos", "Herida quirurgica sin signos inflamatorios"], "escala": "1=Grave, 5=Ninguna"}
    ],
    "complicaciones": ["Malfuncion de la derivacion (obstruccion, desconexion, fractura del cateter)", "Infeccion de la derivacion (meningitis o ventriculitis)", "Hiperdrenaje con hematoma subdural bilateral", "Epilepsia postquirurgica", "Herniacion cerebral en hidrocefalia aguda no tratada"],
    "criteriosAlarma": ["Deterioro brusco del nivel de consciencia", "Cefalea muy intensa de inicio brusco con nauseas y vomitos", "Fiebre con rigidez de nuca en paciente con DVP (meningitis por derivacion)", "Fontanela muy abombada y tensa en lactante", "Anisocoria (herniacion inminente)"],
    "emergencyLevel": "critico",
    "relatedPathologyIds": ["pat_hipertension_intracraneal"],
    "isPremium": True
  }
]

with open('F:/programas/Patologias/src/data/pathologies.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

data.extend(new_pathologies)

with open('F:/programas/Patologias/src/data/pathologies.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f'Done. Total pathologies: {len(data)}')
