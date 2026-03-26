#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Agrega 7 patologias de traumatologia a pathologies.json
"""

import json
import os

DATA_PATH = os.path.join(os.path.dirname(__file__), '..', 'src', 'data', 'pathologies.json')

trauma_pathologies = [
    # =====================================================================
    # 1. TRAUMATISMO CRANEOENCEFALICO (TCE)
    # =====================================================================
    {
        "id": "pat_tce",
        "nombre": "Traumatismo Craneoencefalico",
        "bodySystemId": "traumatologico",
        "definicion": "Lesion cerebral adquirida causada por una fuerza mecanica externa sobre el craneo que produce alteracion temporal o permanente de la funcion cerebral. Incluye lesion primaria (impacto directo) y lesion secundaria (hipoxia, hipotension, edema, herniacion). Es una de las principales causas de morbimortalidad en jovenes y adultos.",
        "epidemiologia": "Incidencia de 200-300 casos por 100.000 habitantes/año. Principal causa de muerte en menores de 45 años. Los accidentes de transito son la causa mas frecuente (50-60%), seguidos de caidas (20-30%). Mortalidad del TCE severo: 30-50%. Relacion hombre/mujer 3:1.",
        "factoresRiesgo": [
            "Accidentes de transito (motociclistas sin casco)",
            "Caidas en adultos mayores y niños",
            "Violencia interpersonal y agresiones",
            "Deportes de contacto sin proteccion",
            "Consumo de alcohol y sustancias psicoactivas",
            "Edad extrema (niños menores de 5 años y mayores de 65)",
            "Uso de anticoagulantes (mayor riesgo de hemorragia)",
            "Coagulopatias previas",
            "Actividades laborales de riesgo (construccion, mineria)"
        ],
        "fisiopatologia": "La lesion primaria ocurre en el momento del impacto e incluye contusion cerebral, laceracion, hematomas y lesion axonal difusa. La doctrina de Monro-Kellie establece que el volumen intracraneal es fijo (cerebro 80%, LCR 10%, sangre 10%); el aumento de cualquier componente eleva la presion intracraneal (PIC). La lesion secundaria se desarrolla en horas-dias e incluye edema cerebral citoxico y vasogenico, isquemia por hipoperfusion, cascada inflamatoria con liberacion de glutamato (excitotoxicidad), produccion de radicales libres y apoptosis neuronal. La herniacion transtentorial es la complicacion mas temida: el uncus temporal comprime el tronco encefalico causando midriasis ipsilateral y coma. La autorregulacion cerebral se pierde cuando la PIC supera los 20-25 mmHg, comprometiendo la presion de perfusion cerebral (PPC = PAM - PIC).",
        "signosYSintomas": {
            "signos": [
                "Alteracion del nivel de conciencia (GCS < 15)",
                "Anisocoria (midriasis unilateral por herniacion uncal)",
                "Triada de Cushing (hipertension, bradicardia, patron respiratorio irregular)",
                "Otorragia u otorraquia (fractura de peñasco)",
                "Rinorraquia (fractura de base de craneo anterior)",
                "Signo de Battle (equimosis mastoidea)",
                "Ojos de mapache (equimosis periorbitaria bilateral)",
                "Deficit motor focal (hemiparesia/hemiplejia)",
                "Convulsiones postraumaticas"
            ],
            "sintomas": [
                "Cefalea intensa y progresiva",
                "Nauseas y vomitos en proyectil",
                "Amnesia del evento (retrograda y anterograda)",
                "Confusion y desorientacion",
                "Somnolencia progresiva",
                "Vision doble o borrosa",
                "Mareos y vertigo"
            ]
        },
        "clasificacion": {
            "nombre": "Clasificacion segun Escala de Coma de Glasgow (GCS)",
            "tipos": [
                {
                    "nombre": "TCE Leve",
                    "descripcion": "GCS 14-15. Paciente alerta u obnubilado. Perdida de conciencia < 30 min. Amnesia < 24 horas. Observacion 24-48h"
                },
                {
                    "nombre": "TCE Moderado",
                    "descripcion": "GCS 9-13. Alteracion de conciencia prolongada. Deficit neurologico focal posible. Requiere internacion y TAC seriada"
                },
                {
                    "nombre": "TCE Severo",
                    "descripcion": "GCS 3-8. Coma. Requiere intubacion orotraqueal, monitorizacion de PIC e internacion en UCI. Alta mortalidad"
                },
                {
                    "nombre": "TCE con lesion focal",
                    "descripcion": "Hematoma epidural, subdural, contusion o hemorragia intraparenquimatosa identificables en TAC"
                }
            ]
        },
        "diagnostico": {
            "anamnesis": [
                "Mecanismo de lesion (impacto directo, aceleracion-desaceleracion, rotacional)",
                "Tiempo transcurrido desde el evento",
                "Perdida de conciencia y su duracion",
                "Uso de anticoagulantes o antiplaquetarios",
                "Consumo de alcohol u otras sustancias",
                "Antecedentes de TCE previo o cirugia craneal",
                "Intervalo lucido (sugiere hematoma epidural)"
            ],
            "examenFisico": [
                "Escala de Coma de Glasgow (apertura ocular, respuesta verbal, respuesta motora)",
                "Evaluacion pupilar bilateral (tamaño, simetria, reactividad a la luz)",
                "Examen de pares craneales",
                "Evaluacion de fuerza y sensibilidad en 4 extremidades",
                "Inspeccion de craneo (heridas, hundimientos, crepitacion)",
                "Busqueda de signos de fractura de base de craneo",
                "Patron respiratorio (Cheyne-Stokes, hiperventilacion central)"
            ],
            "pruebas": [
                {
                    "nombre": "Tomografia computarizada (TAC) de craneo sin contraste",
                    "descripcion": "Estudio de eleccion inicial. Detecta hemorragias, fracturas, edema cerebral, efecto de masa y desviacion de linea media. Criterio quirurgico: desviacion > 5 mm",
                    "valoresReferencia": "Normal: sin colecciones, sin desviacion de linea media, cisternas basales permeables, PIC estimada normal",
                    "cuidadosEnfermeria": [
                        "Estabilizar al paciente antes del traslado (ABCDE)",
                        "Inmovilizacion cervical hasta descartar lesion asociada",
                        "Monitorizar constantes vitales durante el traslado",
                        "Acompañar al paciente con equipo de reanimacion"
                    ]
                },
                {
                    "nombre": "Monitorizacion de presion intracraneal (PIC)",
                    "descripcion": "Cateter intraventricular (gold standard) o sensor intraparenquimatoso. Indicada en TCE severo (GCS <= 8) con TAC anormal. Permite drenaje terapeutico de LCR",
                    "valoresReferencia": "PIC normal: 5-15 mmHg. Hipertension intracraneal: > 20-25 mmHg. PPC objetivo: > 60-70 mmHg",
                    "cuidadosEnfermeria": [
                        "Mantener transductor a nivel del tragus (referencia cero)",
                        "Verificar morfologia de la onda de PIC",
                        "Registrar PIC y PPC cada hora",
                        "Tecnica aseptica estricta en manipulacion del cateter",
                        "Vigilar signos de infeccion en sitio de insercion"
                    ]
                },
                {
                    "nombre": "Resonancia magnetica cerebral",
                    "descripcion": "Superior a TAC para detectar lesion axonal difusa, contusiones pequeñas y lesiones de fosa posterior. No es estudio inicial de urgencia",
                    "valoresReferencia": "Normal: sin focos hemorragicos, sin edema, sin lesion axonal",
                    "cuidadosEnfermeria": [
                        "Verificar ausencia de material ferromagnetico (clips, marcapasos)",
                        "Paciente debe estar estable hemodinamicamente",
                        "Sedacion puede ser necesaria en pacientes agitados"
                    ]
                }
            ]
        },
        "tratamientoMedico": {
            "objetivos": [
                "Prevenir y tratar la lesion cerebral secundaria",
                "Mantener PIC < 20-22 mmHg y PPC > 60-70 mmHg",
                "Asegurar oxigenacion y perfusion cerebral adecuadas",
                "Identificar y evacuar lesiones con indicacion quirurgica",
                "Prevenir complicaciones (convulsiones, infecciones, TVP)"
            ],
            "farmacologico": [
                {
                    "nombre": "Manitol 20%",
                    "grupo": "Diuretico osmotico",
                    "mecanismo": "Crea gradiente osmotico que extrae agua del parenquima cerebral hacia el espacio intravascular, reduciendo el edema cerebral y la PIC. Efecto en 15-30 minutos",
                    "dosis": "0.25-1 g/kg IV en bolo, cada 4-6 horas. No superar osmolaridad serica de 320 mOsm/L",
                    "cuidadosEnfermeria": [
                        "Administrar por via periferica gruesa o via central",
                        "Utilizar filtro en linea para cristales",
                        "Monitorizar osmolaridad serica cada 6 horas",
                        "Control estricto de diuresis (puede producir diuresis masiva)",
                        "Vigilar signos de deshidratacion e hipotension",
                        "Monitorizar electrolitos (sodio, potasio)"
                    ]
                },
                {
                    "nombre": "Solucion salina hipertonica (SSH 3-7.5%)",
                    "grupo": "Agente osmotico",
                    "mecanismo": "Reduce edema cerebral por gradiente osmotico. Ventaja sobre manitol: expande volemia (util en pacientes hipotensos). No tiene techo de osmolaridad tan restrictivo",
                    "dosis": "SSH 3%: 150-250 mL IV en 20 min. SSH 7.5%: 2 mL/kg en bolo. Objetivo: Na serico 145-155 mEq/L",
                    "cuidadosEnfermeria": [
                        "Administrar exclusivamente por via central (SSH > 3%)",
                        "Monitorizar sodio serico cada 4-6 horas",
                        "Vigilar signos de mielinolisis pontina por correccion rapida",
                        "Control de PIC post-administracion",
                        "Registrar balance hidrico estricto"
                    ]
                },
                {
                    "nombre": "Levetiracetam (Keppra)",
                    "grupo": "Anticonvulsivante",
                    "mecanismo": "Modula liberacion de neurotransmisores mediante union a proteina SV2A en vesiculas sinapticas. Profilaxis de convulsiones postraumaticas tempranas (primeros 7 dias)",
                    "dosis": "500-1000 mg IV/VO cada 12 horas. Ajustar en insuficiencia renal",
                    "cuidadosEnfermeria": [
                        "Administrar IV diluido en 100 mL de SF en 15 min",
                        "Vigilar somnolencia e irritabilidad (efectos adversos comunes)",
                        "Monitorizar funcion renal para ajuste de dosis",
                        "No suspender bruscamente (riesgo de convulsiones de rebote)"
                    ]
                }
            ],
            "noFarmacologico": [
                "Cabecera elevada a 30 grados con cabeza en linea media (favorece drenaje venoso yugular)",
                "Normotermia estricta (tratar fiebre agresivamente, objetivo < 37.5°C)",
                "Normoglucemia (objetivo 80-180 mg/dL, evitar hipo e hiperglucemia)",
                "Normocapnia (PaCO2 35-40 mmHg; hiperventilacion solo como puente en herniacion)",
                "Sedoanalgesia con propofol o midazolam + fentanilo en pacientes intubados",
                "Evitar hipotension (PAS > 100 mmHg en todo momento)",
                "Prevencion de trombosis venosa profunda (medias compresivas, heparina precoz)"
            ],
            "quirurgico": [
                "Craneotomia evacuadora de hematoma epidural (indicada si > 30 mL o grosor > 15 mm)",
                "Craneotomia para hematoma subdural agudo (indicada si grosor > 10 mm o desviacion de linea media > 5 mm)",
                "Craniectomia descompresiva (retiro de fragmento oseo para permitir expansion cerebral en HIC refractaria)",
                "Drenaje ventricular externo (DVE) para drenaje de LCR y control de PIC",
                "Reparacion de fracturas deprimidas (si hundimiento > grosor del craneo)"
            ]
        },
        "cuidadosEnfermeria": {
            "valoracion": [
                "Evaluacion neurologica horaria con GCS completa",
                "Control pupilar bilateral cada hora (tamaño, simetria, reactividad)",
                "Monitorizar PIC y calcular PPC si cateter disponible",
                "Evaluar patron respiratorio y necesidad de via aerea avanzada",
                "Valorar signos de deterioro neurologico (triada de Cushing)",
                "Inspeccionar heridas craneales, otorragia y rinorraquia"
            ],
            "intervenciones": [
                "Mantener cabecera a 30° con cabeza en posicion neutra",
                "Asegurar via aerea permeable y oxigenacion adecuada (SpO2 > 95%)",
                "Administrar terapia osmotica segun indicacion y monitorizar respuesta",
                "Minimizar estimulacion ambiental (luz tenue, ruido bajo, aspiracion breve)",
                "Prevenir aumento de PIC: evitar maniobra de Valsalva, flexion cervical, fiebre",
                "Cuidado de DVE: mantener nivel prescrito, registrar drenaje horario",
                "Prevencion de ulceras por presion con cambios posturales cuidadosos"
            ],
            "educacionPaciente": [
                "Explicar a la familia el estado neurologico y pronostico con lenguaje claro",
                "Instruir sobre signos de alarma al alta (cefalea progresiva, vomitos, confusion)",
                "Enseñar cuidados de herida quirurgica si aplica",
                "Explicar la importancia del seguimiento neurologico ambulatorio",
                "Educar sobre prevencion: uso de casco, cinturon de seguridad, prevencion de caidas",
                "Rehabilitacion cognitiva y fisica: expectativas reales y adherencia"
            ],
            "monitorizacion": [
                "GCS y pupilas cada 1-2 horas (mas frecuente si inestable)",
                "PIC continua con alarma > 20 mmHg",
                "Signos vitales cada hora (PA, FC, FR, SpO2, temperatura)",
                "Glucemia capilar cada 4-6 horas",
                "Osmolaridad serica y sodio cada 6 horas si recibe terapia osmotica",
                "Balance hidrico estricto cada 4 horas"
            ]
        },
        "npiNanda": [
            {
                "codigo": "00201",
                "nombre": "Riesgo de perfusion tisular cerebral ineficaz",
                "definicion": "Vulnerable a una disminucion de la circulacion tisular cerebral que puede comprometer la salud",
                "caracteristicasDefinitorias": [
                    "Alteracion del nivel de conciencia",
                    "Cambios pupilares",
                    "Deficit neurologico focal",
                    "Deterioro cognitivo agudo"
                ],
                "factoresRelacionados": [
                    "Hipertension intracraneal",
                    "Edema cerebral",
                    "Hipotension arterial",
                    "Hipoxemia",
                    "Lesion cerebral traumatica"
                ]
            },
            {
                "codigo": "00085",
                "nombre": "Deterioro de la movilidad fisica",
                "definicion": "Limitacion del movimiento independiente e intencionado del cuerpo o de una o mas extremidades",
                "caracteristicasDefinitorias": [
                    "Dificultad para realizar movimientos voluntarios",
                    "Hemiparesia o hemiplejia",
                    "Inestabilidad postural",
                    "Disminucion de la fuerza muscular"
                ],
                "factoresRelacionados": [
                    "Daño neurologico por TCE",
                    "Sedacion prolongada",
                    "Inmovilizacion por tratamiento"
                ]
            },
            {
                "codigo": "00049",
                "nombre": "Disminucion de la capacidad adaptativa intracraneal",
                "definicion": "Compromiso de los mecanismos de compensacion intracraneal que normalmente mantienen la PIC dentro de rangos normales ante estimulos internos y externos",
                "caracteristicasDefinitorias": [
                    "Elevacion desproporcionada de PIC ante estimulos minimos",
                    "Ondas de PIC patologicas (ondas plateau)",
                    "Aumento de PIC > 20 mmHg sostenido"
                ],
                "factoresRelacionados": [
                    "Edema cerebral",
                    "Hematoma intracraneal",
                    "Obstruccion del drenaje de LCR"
                ]
            }
        ],
        "npiNic": [
            {
                "codigo": "2550",
                "nombre": "Mejora de la perfusion cerebral",
                "actividades": [
                    "Monitorizar PIC y calcular PPC",
                    "Mantener cabecera elevada 30° con cabeza en linea media",
                    "Administrar agentes osmoticos segun prescripcion",
                    "Evitar hipotermia, hipertermia, hipoxia e hipotension",
                    "Minimizar estimulos que aumenten PIC"
                ]
            },
            {
                "codigo": "2620",
                "nombre": "Monitorizacion neurologica",
                "actividades": [
                    "Evaluar GCS de forma sistematica y periodica",
                    "Monitorizar tamaño, simetria y reactividad pupilar",
                    "Evaluar funcion motora y sensitiva",
                    "Detectar signos precoces de herniacion cerebral",
                    "Documentar tendencias en el estado neurologico"
                ]
            },
            {
                "codigo": "2540",
                "nombre": "Manejo del edema cerebral",
                "actividades": [
                    "Administrar terapia osmotica (manitol, SSH) segun protocolo",
                    "Monitorizar osmolaridad serica y electrolitos",
                    "Mantener normocapnia (PaCO2 35-40 mmHg)",
                    "Controlar temperatura corporal (evitar fiebre)",
                    "Coordinar con neurocirugia ante HIC refractaria"
                ]
            }
        ],
        "npiNoc": [
            {
                "codigo": "0909",
                "nombre": "Estado neurologico",
                "indicadores": [
                    "Nivel de conciencia (GCS)",
                    "Tamaño y reactividad pupilar",
                    "Funcion motora y sensitiva",
                    "Patron respiratorio adecuado",
                    "PIC dentro de rangos normales"
                ],
                "escala": "1=Gravemente comprometido, 2=Sustancialmente comprometido, 3=Moderadamente comprometido, 4=Levemente comprometido, 5=No comprometido"
            },
            {
                "codigo": "0802",
                "nombre": "Signos vitales",
                "indicadores": [
                    "PA sistolica y diastolica en rango",
                    "Frecuencia cardiaca regular",
                    "Frecuencia respiratoria normal",
                    "Temperatura corporal en rango"
                ],
                "escala": "1=Desviacion grave, 2=Desviacion sustancial, 3=Desviacion moderada, 4=Desviacion leve, 5=Sin desviacion"
            }
        ],
        "complicaciones": [
            "Herniacion cerebral (transtentorial, subfalcial, amigdalar)",
            "Hematoma epidural o subdural diferido",
            "Convulsiones postraumaticas tempranas y tardias",
            "Hidrocefalia postraumatica",
            "Fistula de LCR (rinorraquia, otorraquia) con riesgo de meningitis",
            "Diabetes insipida central (daño hipotalamo-hipofisario)",
            "Coagulopatia por consumo (liberacion de tromboplastina cerebral)",
            "Sindrome de secrecion inadecuada de ADH (SIADH)"
        ],
        "criteriosAlarma": [
            "Deterioro de GCS >= 2 puntos respecto al basal",
            "Midriasis unilateral fija (herniacion inminente)",
            "Triada de Cushing (hipertension + bradicardia + respiracion irregular)",
            "PIC > 25 mmHg sostenida por mas de 5 minutos",
            "Convulsion tonica-clonica generalizada",
            "Poliuria > 300 mL/h (sospecha de diabetes insipida)",
            "Aparicion de deficit motor nuevo"
        ],
        "emergencyLevel": "critico",
        "relatedPathologyIds": [
            "pat_acv",
            "pat_politraumatismo",
            "pat_lesion_medular",
            "pat_epilepsia"
        ],
        "isPremium": False
    },

    # =====================================================================
    # 2. POLITRAUMATISMO
    # =====================================================================
    {
        "id": "pat_politraumatismo",
        "nombre": "Politraumatismo",
        "bodySystemId": "traumatologico",
        "definicion": "Lesion simultanea de dos o mas regiones corporales o sistemas organicos, siendo al menos una de ellas potencialmente mortal. Se define por un Injury Severity Score (ISS) mayor o igual a 16. Es una emergencia medica que requiere abordaje sistematico y multidisciplinario.",
        "epidemiologia": "Constituye la primera causa de muerte en menores de 40 años a nivel mundial. Tercera causa de muerte global. En Argentina, los accidentes de transito causan mas de 5.000 muertes anuales. Distribucion trimodal de muerte: inmediata (50%, en el lugar), precoz (30%, primeras horas) y tardia (20%, dias-semanas por sepsis y FMO).",
        "factoresRiesgo": [
            "Accidentes de transito (principal causa: 60-70%)",
            "Caidas de altura",
            "Violencia con armas de fuego o arma blanca",
            "Accidentes laborales industriales",
            "Actividades deportivas de alto riesgo",
            "Consumo de alcohol (presente en 30-50% de los casos)",
            "Edad joven (15-44 años: grupo mas afectado)",
            "Sexo masculino (relacion 3:1)",
            "Falta de uso de cinturon de seguridad o casco"
        ],
        "fisiopatologia": "El impacto traumatico genera daño tisular masivo con liberacion de mediadores inflamatorios (TNF-alfa, IL-1, IL-6), activacion del complemento y cascada de coagulacion. Se produce la triada letal: hipotermia (por exposicion y reposicion con fluidos frios), acidosis metabolica (por hipoperfusion tisular y metabolismo anaerobio con acumulacion de lactato) y coagulopatia (consumo de factores, hemodilusion, hipotermia que inhibe la cascada). La respuesta sistemica inflamatoria (SIRS) puede progresar a disfuncion multiorganica (FMO). El shock hemorragico es la causa de muerte prevenible mas frecuente: la hemorragia no controlada produce hipoperfusion tisular, daño celular irreversible y muerte.",
        "signosYSintomas": {
            "signos": [
                "Taquicardia (FC > 100 lpm, signo precoz de hipovolemia)",
                "Hipotension arterial (PAS < 90 mmHg, signo tardio de shock)",
                "Taquipnea (FR > 20 rpm)",
                "Alteracion del nivel de conciencia (GCS < 15)",
                "Piel palida, fria, sudorosa (vasoconstriccion periferica)",
                "Llenado capilar > 2 segundos",
                "Deformidades oseas visibles o crepitacion",
                "Heridas abiertas, hemorragia externa activa",
                "Distension abdominal (hemorragia intraabdominal)"
            ],
            "sintomas": [
                "Dolor intenso generalizado o localizado",
                "Dificultad respiratoria",
                "Sed intensa (signo de hipovolemia)",
                "Ansiedad y agitacion",
                "Sensacion de frio",
                "Debilidad generalizada",
                "Incapacidad para movilizarse"
            ]
        },
        "clasificacion": {
            "nombre": "Clasificacion segun Injury Severity Score (ISS) y tipo de trauma",
            "tipos": [
                {
                    "nombre": "Politraumatismo cerrado",
                    "descripcion": "Sin solucion de continuidad en piel. Causas: accidentes viales, caidas, aplastamiento. Riesgo de lesiones ocultas"
                },
                {
                    "nombre": "Politraumatismo penetrante",
                    "descripcion": "Con lesion abierta (arma blanca, arma de fuego). Mayor riesgo de lesion visceral directa y contaminacion"
                },
                {
                    "nombre": "ISS 16-24 (moderado-severo)",
                    "descripcion": "Multiples lesiones significativas. Requiere hospitalizacion y manejo multidisciplinario"
                },
                {
                    "nombre": "ISS >= 25 (critico)",
                    "descripcion": "Lesiones multiples que amenazan la vida. Alta mortalidad. Requiere cirugia de control de daños"
                }
            ]
        },
        "diagnostico": {
            "anamnesis": [
                "Mecanismo de lesion detallado (cinematica del trauma)",
                "Velocidad estimada del impacto",
                "Uso de dispositivos de seguridad (cinturon, casco, airbag)",
                "Tiempo desde el evento (hora dorada)",
                "Tratamiento prehospitalario recibido",
                "Antecedentes medicos y alergias (SAMPLE: Sintomas, Alergias, Medicacion, Patologias, Libaciones, Eventos)",
                "Estado de conciencia en el lugar del accidente"
            ],
            "examenFisico": [
                "Evaluacion primaria ATLS sistematica: A (via aerea con control cervical), B (respiracion), C (circulacion con control de hemorragias), D (deficit neurologico), E (exposicion)",
                "Evaluacion secundaria cefalocaudal completa",
                "Log-roll para inspeccion de espalda y columna",
                "Tacto rectal y sondaje vesical (si no hay contraindicacion)",
                "Evaluacion del pulso en 4 extremidades",
                "Estabilidad pelvica (maniobra de compresion lateral unica)"
            ],
            "pruebas": [
                {
                    "nombre": "FAST (Focused Assessment with Sonography in Trauma)",
                    "descripcion": "Ecografia rapida en 4 puntos (hepatorrenal, esplenorrenal, pelvis, pericardico) para detectar liquido libre intraabdominal o pericardico. Se realiza en sala de emergencia sin mover al paciente",
                    "valoresReferencia": "Negativo: sin liquido libre. Positivo: liquido libre en cualquier ventana. FAST positivo + inestabilidad = laparotomia urgente",
                    "cuidadosEnfermeria": [
                        "Facilitar acceso al abdomen (retirar ropa)",
                        "Mantener monitorizacion continua durante el estudio",
                        "Preparar para quirofano si FAST positivo y paciente inestable",
                        "Documentar resultado y hora del estudio"
                    ]
                },
                {
                    "nombre": "Tomografia computarizada corporal total (body CT)",
                    "descripcion": "TAC de craneo, columna cervical, torax, abdomen y pelvis con contraste IV. Gold standard en paciente estable hemodinamicamente. Detecta lesiones ocultas",
                    "valoresReferencia": "Normal: sin focos hemorragicos, sin neumotorax, sin fracturas, organos sin lesion parenquimatosa",
                    "cuidadosEnfermeria": [
                        "Solo en paciente hemodinamicamente estable",
                        "Mantener inmovilizacion cervical durante traslado",
                        "Via periferica gruesa (18G) para contraste IV",
                        "Monitorizar signos vitales durante el estudio",
                        "Preparar equipo de reanimacion por si deterioro"
                    ]
                },
                {
                    "nombre": "Laboratorio de trauma (panel completo)",
                    "descripcion": "Hemograma, grupo y factor, coagulograma, gasometria arterial con lactato, ionograma, funcion renal, amilasa, prueba cruzada. Acido tranexamico requiere lactato y coagulacion basal",
                    "valoresReferencia": "Hb > 7 g/dL, plaquetas > 50.000, INR < 1.5, lactato < 2 mmol/L, pH > 7.35, BE > -6",
                    "cuidadosEnfermeria": [
                        "Extraer muestras al momento de colocar via periferica",
                        "Solicitar grupo y factor con prueba cruzada urgente",
                        "Identificar correctamente las muestras (riesgo de error con multiples pacientes)",
                        "Solicitar resultados con caracter urgente"
                    ]
                }
            ]
        },
        "tratamientoMedico": {
            "objetivos": [
                "Controlar hemorragia activa (causa prevenible de muerte numero 1)",
                "Revertir la triada letal (hipotermia, acidosis, coagulopatia)",
                "Mantener perfusion tisular adecuada (lactato < 2, BE normal)",
                "Identificar y tratar todas las lesiones (primarias y ocultas)",
                "Prevenir disfuncion multiorganica",
                "Resucitacion con control de daños (damage control resuscitation)"
            ],
            "farmacologico": [
                {
                    "nombre": "Acido tranexamico (CRASH-2)",
                    "grupo": "Antifibrinolitico",
                    "mecanismo": "Inhibe la fibrinolisis al bloquear la union de plasminogeno a fibrina. El estudio CRASH-2 demostro reduccion de mortalidad en trauma hemorragico si se administra dentro de las primeras 3 horas",
                    "dosis": "1 g IV en 10 min (primera dosis), seguido de 1 g IV en infusion en 8 horas. DEBE iniciarse dentro de las primeras 3 horas del trauma",
                    "cuidadosEnfermeria": [
                        "Administrar la primera dosis lo mas pronto posible (idealmente prehospitalario)",
                        "No administrar si han pasado mas de 3 horas desde el trauma (puede ser perjudicial)",
                        "Diluir en 100 mL de SF o Ringer para infusion",
                        "Vigilar signos de trombosis (TEP, TVP)",
                        "Registrar hora exacta de administracion"
                    ]
                },
                {
                    "nombre": "Hemoderivados (protocolo de transfusion masiva)",
                    "grupo": "Terapia transfusional",
                    "mecanismo": "Reposicion de globulos rojos, plasma fresco congelado, plaquetas y crioprecipitado en relacion 1:1:1 para restablecer capacidad de transporte de O2 y hemostasia. Reposicion balanceada frente a la antigua reposicion con cristaloides",
                    "dosis": "Protocolo de transfusion masiva: GR:PFC:Plaquetas en relacion 1:1:1. Activar cuando se anticipan > 10 unidades de GR en 24h o > 4 unidades en 1 hora",
                    "cuidadosEnfermeria": [
                        "Verificar grupo sanguineo y compatibilidad (O negativo si urgencia extrema)",
                        "Usar calentador de fluidos para prevenir hipotermia",
                        "Monitorizar signos de reaccion transfusional",
                        "Control de calcio ionizado (citrato de hemoderivados quela calcio)",
                        "Registrar unidades transfundidas con hora exacta"
                    ]
                },
                {
                    "nombre": "Noradrenalina",
                    "grupo": "Vasopresor catecolaminergico",
                    "mecanismo": "Agonista alfa-1 predominante con efecto beta-1 leve. Produce vasoconstriccion y aumento de PA. Solo usar DESPUES de reposicion volemica adecuada",
                    "dosis": "0.01-0.5 mcg/kg/min en infusion continua. Titular segun PAM objetivo >= 65 mmHg",
                    "cuidadosEnfermeria": [
                        "Administrar exclusivamente por via central",
                        "Dilucion estandar: 8 mg en 250 mL de dextrosa 5%",
                        "Monitorizar PA invasiva (linea arterial) idealmente",
                        "Vigilar extravasacion (necrosis tisular)",
                        "No usar como reemplazo de reposicion volemica"
                    ]
                }
            ],
            "noFarmacologico": [
                "Inmovilizacion cervical hasta descartar lesion de columna",
                "Control de hemorragia externa con presion directa y torniquetes",
                "Hipotension permisiva (PAS 80-90 mmHg) hasta control quirurgico de hemorragia",
                "Calentamiento activo (manta termica, fluidos calentados a 39°C)",
                "Fijador pelvico externo o sabana pelvica en fractura de pelvis",
                "Via aerea definitiva (intubacion orotraqueal) si GCS <= 8 o compromiso de via aerea"
            ],
            "quirurgico": [
                "Cirugia de control de daños (damage control surgery): control de hemorragia y contaminacion, packing, cierre temporal, estabilizacion en UCI, cirugia definitiva a las 24-48h",
                "Laparotomia exploratoria urgente (FAST +, inestabilidad hemodinamica)",
                "Toracotomia de emergencia (taponamiento cardiaco, hemorragia masiva toracica)",
                "Fijacion externa de fracturas de pelvis y huesos largos",
                "Esplenectomia o empaquetamiento hepatico segun lesion"
            ]
        },
        "cuidadosEnfermeria": {
            "valoracion": [
                "Evaluacion primaria ABCDE rapida y sistematica",
                "Monitorizar signos vitales continuos (PA, FC, FR, SpO2, T°)",
                "Evaluar nivel de conciencia con GCS cada 15-30 minutos",
                "Cuantificar hemorragia visible y estimar perdida sanguinea",
                "Valorar llenado capilar y perfusion periferica",
                "Control de temperatura central (evitar hipotermia < 35°C)"
            ],
            "intervenciones": [
                "Colocar dos vias perifericas gruesas (14-16G) en miembros superiores",
                "Iniciar reposicion volemica con solucion tibia segun indicacion",
                "Administrar acido tranexamico dentro de las primeras 3 horas",
                "Mantener permeabilidad de via aerea y asistir intubacion si necesario",
                "Inmovilizar fracturas inestables con ferulas antes de traslado",
                "Colocar sonda vesical y nasogastrica (si no contraindicadas)",
                "Preparar quirofano y banco de sangre con anticipacion"
            ],
            "educacionPaciente": [
                "Informar a la familia sobre el estado del paciente y plan de tratamiento",
                "Explicar la necesidad de cirugia y procedimientos invasivos",
                "Enseñar prevencion de accidentes (cinturon, casco, manejo responsable)",
                "Instruir sobre el proceso de rehabilitacion y tiempos esperados",
                "Brindar apoyo emocional y derivar a salud mental si necesario",
                "Explicar cuidados domiciliarios al alta (heridas, medicacion, signos de alarma)"
            ],
            "monitorizacion": [
                "Signos vitales continuos con monitor multiparametrico",
                "Diuresis horaria (objetivo > 0.5 mL/kg/h como indicador de perfusion renal)",
                "Gasometria arterial seriada con lactato (marcador de perfusion tisular)",
                "Hemoglobina y coagulacion cada 2-4 horas en fase aguda",
                "Temperatura central cada hora (prevenir hipotermia)",
                "Balance hidrico estricto cada hora"
            ]
        },
        "npiNanda": [
            {
                "codigo": "00206",
                "nombre": "Riesgo de sangrado",
                "definicion": "Vulnerable a una disminucion del volumen de sangre que puede comprometer la salud",
                "caracteristicasDefinitorias": [
                    "Hemorragia activa visible",
                    "Caida de hemoglobina",
                    "Taquicardia e hipotension",
                    "Palidez y llenado capilar lento"
                ],
                "factoresRelacionados": [
                    "Trauma con lesion vascular",
                    "Coagulopatia por consumo",
                    "Hipotermia que inhibe coagulacion",
                    "Procedimientos quirurgicos"
                ]
            },
            {
                "codigo": "00205",
                "nombre": "Riesgo de shock",
                "definicion": "Vulnerable a un aporte sanguineo inadecuado a los tejidos corporales que puede conducir a una disfuncion celular que constituye una amenaza para la vida",
                "caracteristicasDefinitorias": [
                    "Hipotension arterial",
                    "Taquicardia compensadora",
                    "Oliguria",
                    "Acidosis metabolica con lactato elevado"
                ],
                "factoresRelacionados": [
                    "Hipovolemia por hemorragia",
                    "Perdida masiva de sangre",
                    "Respuesta inflamatoria sistemica"
                ]
            },
            {
                "codigo": "00032",
                "nombre": "Patron respiratorio ineficaz",
                "definicion": "Inspiracion y/o espiracion que no proporciona una ventilacion adecuada",
                "caracteristicasDefinitorias": [
                    "Disnea",
                    "Taquipnea",
                    "Uso de musculos accesorios",
                    "Disminucion de murmullo vesicular"
                ],
                "factoresRelacionados": [
                    "Neumotorax traumatico",
                    "Contusion pulmonar",
                    "Dolor toracico por fracturas costales",
                    "Alteracion del nivel de conciencia"
                ]
            }
        ],
        "npiNic": [
            {
                "codigo": "4026",
                "nombre": "Reduccion de la hemorragia",
                "actividades": [
                    "Aplicar presion directa sobre sitios de sangrado activo",
                    "Colocar torniquete en extremidades si hemorragia no controlable",
                    "Administrar hemoderivados segun protocolo de transfusion masiva",
                    "Monitorizar hemoglobina y coagulacion seriada",
                    "Preparar para intervencion quirurgica si hemorragia interna"
                ]
            },
            {
                "codigo": "4260",
                "nombre": "Prevencion del shock",
                "actividades": [
                    "Canalizar dos vias perifericas gruesas y reponer volumen",
                    "Monitorizar signos precoces de shock (taquicardia, llenado capilar)",
                    "Mantener temperatura corporal > 36°C",
                    "Administrar vasopresores si hipotension refractaria a volumen",
                    "Evaluar diuresis como marcador de perfusion"
                ]
            },
            {
                "codigo": "6200",
                "nombre": "Cuidados en emergencia",
                "actividades": [
                    "Realizar evaluacion primaria ABCDE sistematica",
                    "Coordinar equipo multidisciplinario de trauma",
                    "Priorizar intervenciones segun amenaza vital",
                    "Documentar procedimientos, tiempos y respuesta del paciente",
                    "Activar protocolo de transfusion masiva cuando indicado"
                ]
            }
        ],
        "npiNoc": [
            {
                "codigo": "0413",
                "nombre": "Severidad de la perdida de sangre",
                "indicadores": [
                    "Perdida de sangre visible controlada",
                    "Hemoglobina estable",
                    "PA mantenida en rango aceptable",
                    "Ausencia de sangrado activo"
                ],
                "escala": "1=Grave, 2=Sustancial, 3=Moderado, 4=Leve, 5=Ninguno"
            },
            {
                "codigo": "0802",
                "nombre": "Signos vitales",
                "indicadores": [
                    "PA sistolica > 90 mmHg",
                    "FC < 100 lpm",
                    "FR 12-20 rpm",
                    "Temperatura > 36°C",
                    "SpO2 > 95%"
                ],
                "escala": "1=Desviacion grave, 2=Desviacion sustancial, 3=Desviacion moderada, 4=Desviacion leve, 5=Sin desviacion"
            }
        ],
        "complicaciones": [
            "Shock hemorragico irreversible",
            "Sindrome de disfuncion multiorganica (FMO)",
            "Sindrome de distres respiratorio agudo (SDRA)",
            "Coagulacion intravascular diseminada (CID)",
            "Sepsis y shock septico",
            "Sindrome compartimental abdominal",
            "Tromboembolismo pulmonar",
            "Rabdomiolisis con insuficiencia renal aguda"
        ],
        "criteriosAlarma": [
            "PAS < 90 mmHg que no responde a 2 litros de cristaloides",
            "FC > 120 lpm sostenida",
            "Lactato > 4 mmol/L o en ascenso",
            "Hemoglobina < 7 g/dL con sangrado activo",
            "Deterioro de GCS >= 2 puntos",
            "Diuresis < 0.5 mL/kg/h por 2 horas consecutivas",
            "Temperatura < 35°C (hipotermia)"
        ],
        "emergencyLevel": "critico",
        "relatedPathologyIds": [
            "pat_tce",
            "pat_trauma_toracico",
            "pat_trauma_abdominal",
            "pat_fracturas_extremidades",
            "pat_shock_hipovolemico"
        ],
        "isPremium": False
    },

    # =====================================================================
    # 3. QUEMADURAS
    # =====================================================================
    {
        "id": "pat_quemaduras",
        "nombre": "Quemaduras",
        "bodySystemId": "traumatologico",
        "definicion": "Lesion tisular causada por agentes termicos, quimicos, electricos o por radiacion que produce destruccion de las capas de la piel y potencialmente de estructuras profundas. Su gravedad depende de la extension (% de superficie corporal quemada - SCQ), profundidad y localizacion.",
        "epidemiologia": "Incidencia global de 11 millones de casos/año que requieren atencion medica. Las quemaduras causan aproximadamente 180.000 muertes anuales en el mundo. En Argentina, se registran 50.000-100.000 casos/año. Los niños menores de 5 años y adultos mayores son los grupos mas vulnerables. Las escaldaduras son la causa mas frecuente en pediatria.",
        "factoresRiesgo": [
            "Edad extrema (niños < 5 años y adultos > 65 años)",
            "Exposicion laboral a agentes termicos o quimicos",
            "Incendios domiciliarios (principal causa de muerte por quemaduras)",
            "Escaldaduras por liquidos calientes (primera causa en pediatria)",
            "Contacto con electricidad de alta tension",
            "Abuso infantil (quemaduras intencionales: patron en guante o calcetin)",
            "Epilepsia (convulsiones cerca de fuentes de calor)",
            "Consumo de alcohol y drogas",
            "Condiciones de vivienda precaria"
        ],
        "fisiopatologia": "La quemadura produce tres zonas concentricas descritas por Jackson: zona de coagulacion (centro, necrosis irreversible), zona de estasis (circundante, vasodilatacion e isquemia potencialmente reversible, objetivo del tratamiento) y zona de hiperemia (periferica, vasodilatacion, recupera espontaneamente). Cuando la SCQ supera el 20-25%, se produce respuesta inflamatoria sistemica con aumento de permeabilidad capilar masiva, perdida de plasma al intersticio (edema), hipovolemia y shock por quemadura. La perdida de la barrera cutanea predispone a infecciones, evaporacion excesiva e hipotermia. En las primeras 24-48h predomina la fase de reanimacion (reposicion de liquidos segun formula de Parkland), y luego la fase hipermetabolica con catabolismo proteico severo.",
        "signosYSintomas": {
            "signos": [
                "Eritema, ampollas o escaras segun profundidad",
                "Edema local o generalizado (en quemaduras extensas)",
                "Escara rigida, seca, acartonada (quemadura profunda)",
                "Taquicardia (por dolor, hipovolemia o respuesta inflamatoria)",
                "Hipotension en quemaduras extensas (> 20% SCQ)",
                "Estridor laringeo, hollín en nares o esputo carbonaceo (lesion inhalatoria)",
                "Disminucion del murmullo vesicular (edema pulmonar o lesion inhalatoria)",
                "Pulsos perifericos disminuidos en quemaduras circunferenciales"
            ],
            "sintomas": [
                "Dolor intenso en quemaduras superficiales (terminaciones nerviosas intactas)",
                "Ausencia de dolor en quemaduras profundas (destruccion de terminaciones nerviosas)",
                "Sed intensa (por perdida de liquidos)",
                "Ansiedad y agitacion",
                "Dificultad respiratoria (si hay lesion inhalatoria)",
                "Escalofrios y sensacion de frio"
            ]
        },
        "clasificacion": {
            "nombre": "Clasificacion segun profundidad de la quemadura",
            "tipos": [
                {
                    "nombre": "Primer grado (epidermica)",
                    "descripcion": "Solo afecta epidermis. Eritema doloroso sin ampollas. Ejemplo: quemadura solar. Cura en 3-7 dias sin cicatriz"
                },
                {
                    "nombre": "Segundo grado superficial (dermica superficial)",
                    "descripcion": "Epidermis y dermis papilar. Ampollas con base rosada, dolor intenso, blanquea a la presion. Cura en 10-21 dias"
                },
                {
                    "nombre": "Segundo grado profundo (dermica profunda)",
                    "descripcion": "Epidermis y dermis reticular. Ampollas con base palida, dolor disminuido, no blanquea bien. Requiere injerto frecuentemente"
                },
                {
                    "nombre": "Tercer grado (espesor total)",
                    "descripcion": "Destruccion de todas las capas de piel. Escara blanca, marron o negra, indolora, textura acartonada. Siempre requiere injerto"
                }
            ]
        },
        "diagnostico": {
            "anamnesis": [
                "Agente causal (termico, quimico, electrico, radiacion)",
                "Tiempo de exposicion al agente",
                "Ambiente cerrado o abierto (riesgo de lesion inhalatoria)",
                "Hora exacta de la quemadura (para calculo de Parkland)",
                "Primeros auxilios realizados (enfriamiento con agua)",
                "Antecedentes: edad, comorbilidades, medicacion",
                "Mecanismo compatible con maltrato en niños (descartar)"
            ],
            "examenFisico": [
                "Estimacion de SCQ con Regla de los 9 de Wallace (adultos) o tabla de Lund-Browder (niños)",
                "Evaluacion de profundidad de cada area quemada",
                "Evaluacion de via aerea: edema facial, vibrisas quemadas, hollin, estridor, disfonía",
                "Busqueda de quemaduras circunferenciales (riesgo de sindrome compartimental)",
                "Evaluacion de pulsos perifericos distales en extremidades quemadas",
                "Examen neurologico (quemaduras electricas: arritmias y lesion muscular profunda)"
            ],
            "pruebas": [
                {
                    "nombre": "Laboratorio inicial de gran quemado",
                    "descripcion": "Hemograma, ionograma, funcion renal, gasometria, lactato, CPK (quemaduras electricas), carboxihemoglobina (si exposicion a humo), coagulacion, albumina",
                    "valoresReferencia": "Hto puede estar elevado por hemoconcentracion. CPK > 5000 U/L sugiere rabdomiolisis. COHb > 10% confirma intoxicacion por CO. Albumina < 2 g/dL indica perdida proteica severa",
                    "cuidadosEnfermeria": [
                        "Extraer muestras al canalizar via periferica",
                        "Solicitar carboxihemoglobina si sospecha de inhalacion de humo",
                        "Solicitar CPK seriada en quemaduras electricas",
                        "Repetir laboratorio cada 6-8 horas en fase de reanimacion"
                    ]
                },
                {
                    "nombre": "Fibrobroncoscopia",
                    "descripcion": "Gold standard para diagnostico de lesion inhalatoria. Visualiza edema, eritema, hollin y necrosis de mucosa de via aerea. Indicada ante sospecha clinica de lesion por inhalacion",
                    "valoresReferencia": "Normal: mucosa rosada sin edema. Patologica: eritema, edema, depositos de hollin, ulceracion de mucosa",
                    "cuidadosEnfermeria": [
                        "Paciente debe estar intubado o con via aerea asegurada",
                        "Preparar equipo de intubacion de emergencia",
                        "Monitorizar SpO2 continuamente durante el procedimiento",
                        "Vigilar broncoespasmo post-procedimiento"
                    ]
                },
                {
                    "nombre": "Electrocardiograma de 12 derivaciones",
                    "descripcion": "Obligatorio en quemaduras electricas. La corriente electrica puede causar arritmias fatales, daño miocardico y trastornos de conduccion",
                    "valoresReferencia": "Normal: ritmo sinusal, sin arritmias. Patologico: FA, TV, FV, bloqueos, cambios ST",
                    "cuidadosEnfermeria": [
                        "Realizar ECG inmediato en toda quemadura electrica",
                        "Monitorizar con telemetria por 24-48 horas minimo",
                        "Vigilar aparicion de arritmias tardias",
                        "Tener desfibrilador disponible"
                    ]
                }
            ]
        },
        "tratamientoMedico": {
            "objetivos": [
                "Mantener via aerea permeable (intubar precozmente si lesion inhalatoria)",
                "Reanimacion hemodinamica con fluidos segun formula de Parkland",
                "Prevencion de infeccion de herida por quemadura",
                "Manejo adecuado del dolor",
                "Soporte nutricional hipercalorico e hiperproteico",
                "Cobertura cutanea definitiva lo antes posible"
            ],
            "farmacologico": [
                {
                    "nombre": "Ringer Lactato (Formula de Parkland)",
                    "grupo": "Cristaloide isotónico para reanimacion",
                    "mecanismo": "Repone volumen intravascular perdido por aumento de permeabilidad capilar. La formula de Parkland calcula: 4 mL x kg peso x % SCQ en primeras 24h; mitad en primeras 8h desde la quemadura, mitad restante en las siguientes 16h",
                    "dosis": "4 mL x kg x % SCQ en 24h. Ejemplo: 70 kg, 40% SCQ = 11.200 mL. Primeras 8h: 5.600 mL. Siguientes 16h: 5.600 mL. Ajustar segun diuresis objetivo",
                    "cuidadosEnfermeria": [
                        "Calcular volumen total y velocidad de infusion horaria",
                        "El tiempo se cuenta desde la HORA de la quemadura, no desde el ingreso",
                        "Objetivo de diuresis: 0.5-1 mL/kg/h en adultos, 1 mL/kg/h en niños",
                        "Sonda vesical para control horario de diuresis",
                        "Ajustar goteo segun respuesta (diuresis es el mejor indicador)",
                        "Calentar fluidos a 39°C para prevenir hipotermia"
                    ]
                },
                {
                    "nombre": "Sulfadiazina de plata 1% (crema topica)",
                    "grupo": "Antibiotico topico para quemaduras",
                    "mecanismo": "Libera iones de plata con accion bactericida de amplio espectro contra gram positivos, gram negativos y hongos. Forma pseudoescara protectora sobre la herida",
                    "dosis": "Aplicar capa de 2-3 mm sobre la superficie quemada cada 12-24 horas, previa limpieza de la herida",
                    "cuidadosEnfermeria": [
                        "Aplicar con tecnica aseptica y guantes esteriles",
                        "Retirar crema anterior con suero fisiologico tibio antes de reaplicar",
                        "Vigilar leucopenia transitoria (efecto adverso de sulfadiazina)",
                        "No utilizar en cara (usar bacitracina en su lugar)",
                        "Contraindicada en alergia a sulfonamidas y en embarazo a termino"
                    ]
                },
                {
                    "nombre": "Morfina IV",
                    "grupo": "Opioide analgesico mayor",
                    "mecanismo": "Agonista de receptores mu opioides. Produce analgesia potente. Las quemaduras superficiales son extremadamente dolorosas y requieren analgesia agresiva",
                    "dosis": "Adultos: 0.1 mg/kg IV en bolo, titular cada 5-10 min segun dolor. Infusion continua: 1-5 mg/h. PCA (analgesia controlada por paciente) si disponible",
                    "cuidadosEnfermeria": [
                        "Evaluar dolor con escala EVA antes y despues de administrar",
                        "Monitorizar FR (depresion respiratoria si FR < 10 rpm)",
                        "Tener naloxona disponible como antidoto",
                        "Administrar IV exclusivamente en gran quemado (absorcion IM erratica por edema)",
                        "Prevenir constipacion con laxantes profilacticos"
                    ]
                }
            ],
            "noFarmacologico": [
                "Enfriamiento inicial con agua corriente (15-20°C) por 20 minutos dentro de las primeras 3 horas",
                "No aplicar hielo, pasta dental, mantequilla ni remedios caseros",
                "Curacion con tecnica aseptica: limpieza, desbridamiento de tejido necrotico, cobertura",
                "Elevacion de extremidades quemadas para reducir edema",
                "Soporte nutricional precoz: formula de Curreri (25 kcal/kg + 40 kcal/%SCQ/dia)",
                "Prevencion de hipotermia (ambiente a 28-33°C, sabanas termicas)",
                "Rehabilitacion temprana: movilizacion y ferulaje en posicion funcional"
            ],
            "quirurgico": [
                "Escarotomia: incision de escara constrictiva en quemaduras circunferenciales para restaurar circulacion distal (urgencia en < 6h si pulsos ausentes)",
                "Fasciotomia: liberacion de sindrome compartimental asociado a quemaduras electricas profundas",
                "Escarectomia tangencial: reseccion del tejido necrotico hasta tejido viable sangrante",
                "Injerto de piel autologa: cobertura definitiva con piel del propio paciente (autoinjerto laminar o mallado)",
                "Cobertura temporal con aloinjerto, xenoinjerto o sustitutos dermicos"
            ]
        },
        "cuidadosEnfermeria": {
            "valoracion": [
                "Evaluar extension (regla de los 9 de Wallace) y profundidad de la quemadura",
                "Monitorizar signos vitales cada hora en fase de reanimacion",
                "Control estricto de diuresis horaria (indicador principal de reanimacion adecuada)",
                "Evaluar via aerea continuamente (edema puede progresar en 24-48h)",
                "Valorar dolor con escala adecuada (EVA, FLACC en niños)",
                "Evaluar pulsos perifericos en extremidades con quemaduras circunferenciales"
            ],
            "intervenciones": [
                "Administrar fluidos IV segun formula de Parkland y ajustar por diuresis",
                "Realizar curaciones con tecnica esteril segun protocolo del centro de quemados",
                "Administrar analgesia anticipada antes de curaciones",
                "Mantener posicion funcional de articulaciones con ferulas",
                "Prevencion de infeccion: aislamiento protector, tecnica aseptica estricta",
                "Cuidado emocional: apoyo psicologico, presencia familiar cuando sea posible"
            ],
            "educacionPaciente": [
                "Enseñar cuidado de heridas y signos de infeccion al alta",
                "Explicar la importancia de la rehabilitacion y uso de prendas compresivas",
                "Instruir sobre proteccion solar permanente de areas injertadas",
                "Educar sobre prevencion de quemaduras en el hogar (especialmente con niños)",
                "Brindar informacion sobre apoyo psicologico y grupos de pares",
                "Explicar el proceso de cicatrizacion y expectativas esteticas realistas"
            ],
            "monitorizacion": [
                "Diuresis horaria (meta 0.5-1 mL/kg/h adulto, 1 mL/kg/h niño)",
                "Signos vitales cada hora en primeras 48h",
                "Balance hidrico estricto cada 4 horas",
                "Temperatura central cada 2 horas (hipotermia frecuente)",
                "Laboratorio seriado: hemoglobina, electrolitos, albumina, funcion renal",
                "Cultivos de herida semanales o ante sospecha de infeccion"
            ]
        },
        "npiNanda": [
            {
                "codigo": "00044",
                "nombre": "Deterioro de la integridad tisular",
                "definicion": "Daño a las membranas mucosas, tegumentaria o subcutanea",
                "caracteristicasDefinitorias": [
                    "Destruccion de capas de la piel",
                    "Eritema, ampollas o escaras",
                    "Exposicion de tejido subcutaneo",
                    "Exudado de la herida"
                ],
                "factoresRelacionados": [
                    "Agente termico, quimico o electrico",
                    "Exposicion a temperaturas extremas",
                    "Destruccion de la barrera cutanea"
                ]
            },
            {
                "codigo": "00132",
                "nombre": "Dolor agudo",
                "definicion": "Experiencia sensitiva y emocional desagradable asociada a daño tisular real",
                "caracteristicasDefinitorias": [
                    "Expresion facial de dolor",
                    "Conducta de proteccion de area quemada",
                    "Taquicardia y diaforesis",
                    "Verbalizacion del dolor"
                ],
                "factoresRelacionados": [
                    "Lesion tisular por quemadura",
                    "Exposicion de terminaciones nerviosas",
                    "Procedimientos de curacion"
                ]
            },
            {
                "codigo": "00028",
                "nombre": "Riesgo de deficit de volumen de liquidos",
                "definicion": "Vulnerable a experimentar disminucion del volumen de liquido intravascular, intersticial o intracelular que puede comprometer la salud",
                "caracteristicasDefinitorias": [
                    "Aumento de permeabilidad capilar",
                    "Perdida de plasma al intersticio",
                    "Hemoconcentracion",
                    "Taquicardia e hipotension"
                ],
                "factoresRelacionados": [
                    "Quemadura extensa (> 20% SCQ)",
                    "Perdida de liquidos por evaporacion",
                    "Edema masivo por aumento de permeabilidad"
                ]
            }
        ],
        "npiNic": [
            {
                "codigo": "3661",
                "nombre": "Cuidado de las heridas: quemaduras",
                "actividades": [
                    "Realizar curacion con tecnica aseptica y material esteril",
                    "Aplicar agente topico prescrito (sulfadiazina de plata u otro)",
                    "Evaluar herida: profundidad, extension, signos de infeccion",
                    "Desbridar tejido necrotico segun indicacion",
                    "Mantener ambiente humedo de cicatrizacion"
                ]
            },
            {
                "codigo": "4120",
                "nombre": "Manejo de liquidos",
                "actividades": [
                    "Calcular requerimientos segun formula de Parkland",
                    "Administrar fluidos IV a velocidad calculada",
                    "Ajustar goteo segun diuresis horaria",
                    "Monitorizar signos de sobrecarga o deficit de volumen",
                    "Registrar balance hidrico estricto"
                ]
            },
            {
                "codigo": "1400",
                "nombre": "Manejo del dolor",
                "actividades": [
                    "Evaluar dolor con escala validada antes y despues de intervenciones",
                    "Administrar analgesia anticipada antes de curaciones",
                    "Implementar medidas no farmacologicas (distraccion, musica, realidad virtual)",
                    "Titular opioides segun respuesta y efectos adversos",
                    "Documentar patron de dolor y respuesta a tratamiento"
                ]
            }
        ],
        "npiNoc": [
            {
                "codigo": "1102",
                "nombre": "Curacion de la herida: por segunda intencion",
                "indicadores": [
                    "Reduccion del tamaño de la herida",
                    "Formacion de tejido de granulacion",
                    "Ausencia de signos de infeccion",
                    "Reepitelizacion progresiva"
                ],
                "escala": "1=Ninguno, 2=Escaso, 3=Moderado, 4=Sustancial, 5=Extenso"
            },
            {
                "codigo": "2102",
                "nombre": "Nivel del dolor",
                "indicadores": [
                    "Dolor referido (escala EVA)",
                    "Expresion facial de dolor",
                    "Inquietud y agitacion",
                    "Frecuencia cardiaca en rango"
                ],
                "escala": "1=Grave, 2=Sustancial, 3=Moderado, 4=Leve, 5=Ninguno"
            }
        ],
        "complicaciones": [
            "Shock hipovolemico por perdida masiva de plasma",
            "Infeccion de herida por quemadura y sepsis (causa principal de muerte tardia)",
            "Sindrome compartimental por quemaduras circunferenciales",
            "Lesion inhalatoria con insuficiencia respiratoria aguda",
            "Intoxicacion por monoxido de carbono o cianuro",
            "Insuficiencia renal aguda por rabdomiolisis (quemaduras electricas)",
            "Cicatrices hipertroficas y queloides",
            "Contracturas articulares"
        ],
        "criteriosAlarma": [
            "SCQ > 20% en adultos o > 10% en niños y ancianos",
            "Quemaduras de via aerea: estridor, disfonía, esputo carbonaceo",
            "Quemaduras circunferenciales en extremidades o torax",
            "Quemadura electrica de alta tension",
            "Diuresis < 0.5 mL/kg/h a pesar de reposicion adecuada",
            "Signos de infeccion: fiebre, cambio de coloracion o exudado purulento en herida",
            "Mioglobinuria (orina oscura en quemaduras electricas)"
        ],
        "emergencyLevel": "critico",
        "relatedPathologyIds": [
            "pat_politraumatismo",
            "pat_shock_hipovolemico",
            "pat_ira",
            "pat_sepsis"
        ],
        "isPremium": False
    },

    # =====================================================================
    # 4. LESION MEDULAR TRAUMATICA
    # =====================================================================
    {
        "id": "pat_lesion_medular",
        "nombre": "Lesion Medular Traumatica",
        "bodySystemId": "traumatologico",
        "definicion": "Daño a la medula espinal causado por un traumatismo que produce alteracion temporal o permanente de la funcion motora, sensitiva y autonomica por debajo del nivel de la lesion. Puede ser completa (perdida total de funcion) o incompleta (preservacion parcial de funcion por debajo del nivel lesional).",
        "epidemiologia": "Incidencia mundial de 10-83 casos por millon de habitantes/año. En Argentina, se estiman 2.000-3.000 nuevos casos anuales. Predominio en varones jovenes (15-35 años), relacion hombre/mujer 4:1. Causas: accidentes de transito (40-50%), caidas (20-30%), violencia (10-15%), deportes (5-10%). Nivel cervical es el mas frecuente (55%). Mortalidad en el primer año: 5-7% en paises desarrollados.",
        "factoresRiesgo": [
            "Accidentes de transito a alta velocidad",
            "Zambullidas en aguas poco profundas",
            "Caidas de altura (laboral, domiciliaria)",
            "Deportes de contacto o extremos",
            "Violencia con armas de fuego",
            "Edad avanzada (caidas con espondilosis cervical previa)",
            "Estenosis espinal preexistente",
            "Osteoporosis (fracturas vertebrales con trauma menor)"
        ],
        "fisiopatologia": "La lesion primaria ocurre por compresion, flexion, extension, rotacion o distraccion de la columna vertebral que daña la medula. La lesion secundaria involucra edema medular, isquemia por daño vascular, liberacion de glutamato (excitotoxicidad), ingreso masivo de calcio intracelular, formacion de radicales libres y apoptosis neuronal progresiva. El shock medular (fase aguda) produce arreflexia flacida completa por debajo de la lesion que puede durar dias a semanas. El shock neurogenico ocurre en lesiones por encima de T6: la perdida del tono simpatico produce bradicardia e hipotension por vasodilatacion (a diferencia del shock hipovolemico donde hay taquicardia). Meses despues, la disreflexia autonomica puede presentarse en lesiones por encima de T6: un estimulo nocivo por debajo de la lesion (vejiga distendida, fecaloma) desencadena respuesta simpatica masiva con hipertension severa, bradicardia, cefalea y riesgo de ACV.",
        "signosYSintomas": {
            "signos": [
                "Perdida de fuerza muscular por debajo del nivel de lesion",
                "Perdida de sensibilidad por debajo del nivel de lesion",
                "Arreflexia en fase de shock medular, luego espasticidad",
                "Hipotension con bradicardia (shock neurogenico en lesiones cervicales/toracicas altas)",
                "Priapismo (signo de lesion medular completa)",
                "Patron respiratorio alterado (paralisis diafragmatica si lesion C3-C5)",
                "Retencion urinaria (vejiga neurogenica)",
                "Ileo paralitico (perdida de motilidad intestinal)"
            ],
            "sintomas": [
                "Dolor en region de la fractura vertebral",
                "Hormigueo o parestesias en extremidades",
                "Debilidad o paralisis de extremidades",
                "Incapacidad para mover piernas o brazos",
                "Sensacion de entumecimiento",
                "Dificultad respiratoria (lesiones cervicales)"
            ]
        },
        "clasificacion": {
            "nombre": "Clasificacion ASIA (American Spinal Injury Association)",
            "tipos": [
                {
                    "nombre": "ASIA A - Completa",
                    "descripcion": "Sin funcion motora ni sensitiva en segmentos sacros S4-S5. Pronostico de recuperacion: minimo"
                },
                {
                    "nombre": "ASIA B - Sensitiva incompleta",
                    "descripcion": "Preservacion sensitiva pero no motora por debajo del nivel, incluyendo S4-S5. Pronostico de recuperacion motora: 15-30%"
                },
                {
                    "nombre": "ASIA C - Motora incompleta (debil)",
                    "descripcion": "Funcion motora preservada por debajo del nivel pero mas de la mitad de musculos clave con fuerza < 3/5"
                },
                {
                    "nombre": "ASIA D - Motora incompleta (util)",
                    "descripcion": "Funcion motora preservada por debajo del nivel con al menos la mitad de musculos clave con fuerza >= 3/5. Mejor pronostico funcional"
                }
            ]
        },
        "diagnostico": {
            "anamnesis": [
                "Mecanismo de lesion (hiperflexion, hiperextension, carga axial, rotacion)",
                "Presencia de deficit neurologico desde el inicio",
                "Dolor cervical o dorsolumbar post-trauma",
                "Parestesias o debilidad en extremidades",
                "Perdida de control de esfinteres",
                "Antecedentes de patologia espinal previa"
            ],
            "examenFisico": [
                "Evaluacion ASIA estandarizada: fuerza en 10 musculos clave bilaterales (C5 a S1)",
                "Evaluacion sensitiva en 28 dermatomas bilaterales (tacto fino y pinprick)",
                "Determinacion del nivel neurologico de la lesion",
                "Evaluacion de funcion sacra: sensibilidad perianal, contraccion voluntaria del esfinter anal",
                "Reflejos: osteotendinosos, bulbocavernoso (fin del shock medular), cremasterico",
                "Evaluacion de patron respiratorio y capacidad vital forzada"
            ],
            "pruebas": [
                {
                    "nombre": "Radiografia de columna vertebral",
                    "descripcion": "Estudio inicial para detectar fracturas, luxaciones y malalienamiento. Incluye AP, lateral y transoral (C1-C2) en columna cervical. Limitada en visualizacion de medula",
                    "valoresReferencia": "Normal: alineacion vertebral conservada, espacios intervertebrales regulares, sin fracturas",
                    "cuidadosEnfermeria": [
                        "Mantener inmovilizacion cervical durante todo el estudio",
                        "No flexionar ni rotar el cuello del paciente",
                        "Utilizar tecnica de log-roll para posicionar",
                        "Retirar collar solo si estudio autorizado por medico"
                    ]
                },
                {
                    "nombre": "TAC de columna vertebral",
                    "descripcion": "Superior a Rx para detallar fracturas, fragmentos oseos en canal medular y estabilidad vertebral. Estudio de eleccion en politraumatizados con TAC corporal total",
                    "valoresReferencia": "Normal: sin fracturas, canal medular permeable, facetas articulares alineadas",
                    "cuidadosEnfermeria": [
                        "Mantener inmovilizacion durante todo el estudio",
                        "Monitorizar signos vitales (riesgo de shock neurogenico)",
                        "Verificar estabilidad hemodinamica antes de trasladar",
                        "Acompañar con monitor y equipo de via aerea"
                    ]
                },
                {
                    "nombre": "Resonancia magnetica de columna",
                    "descripcion": "Gold standard para evaluar medula espinal, discos, ligamentos y compresion medular. Identifica edema medular, hemorragia intramedular y hernias discales traumaticas",
                    "valoresReferencia": "Normal: medula de calibre y señal normales, sin compresion, ligamentos intactos. Patologico: señal hiperintensa en T2 indica edema; hipointensa en T2 indica hemorragia (peor pronostico)",
                    "cuidadosEnfermeria": [
                        "Verificar contraindicaciones para RM (material ferromagnetico, marcapasos)",
                        "Mantener monitorizacion hemodinamica durante el estudio",
                        "Sedacion puede ser necesaria en pacientes agitados",
                        "Estudio puede durar 30-45 minutos: vigilar estabilidad"
                    ]
                }
            ]
        },
        "tratamientoMedico": {
            "objetivos": [
                "Estabilizar la columna y prevenir daño medular adicional",
                "Mantener perfusion medular adecuada (PAM > 85-90 mmHg primera semana)",
                "Prevenir y tratar complicaciones del shock neurogenico",
                "Rehabilitacion precoz para maximizar funcion residual",
                "Manejo de vejiga e intestino neurogenico"
            ],
            "farmacologico": [
                {
                    "nombre": "Noradrenalina o dopamina",
                    "grupo": "Vasopresores",
                    "mecanismo": "Contrarrestan la hipotension del shock neurogenico (perdida del tono simpatico) mediante vasoconstriccion y aumento de PA. Objetivo: PAM > 85-90 mmHg en la primera semana para optimizar perfusion medular",
                    "dosis": "Noradrenalina: 0.01-0.3 mcg/kg/min IV. Dopamina: 5-20 mcg/kg/min IV. Titular segun PAM",
                    "cuidadosEnfermeria": [
                        "Administrar por via central exclusivamente",
                        "Monitorizar PA invasiva (linea arterial) si disponible",
                        "Vigilar bradicardia asociada al shock neurogenico",
                        "Tener atropina disponible para bradicardia severa (FC < 40)",
                        "Registrar PAM horaria como objetivo principal"
                    ]
                },
                {
                    "nombre": "Atropina",
                    "grupo": "Anticolinergico",
                    "mecanismo": "Bloquea receptores muscarinicos, aumentando la frecuencia cardiaca. Indicada para bradicardia sintomatica del shock neurogenico (predominio vagal por perdida del tono simpatico)",
                    "dosis": "0.5-1 mg IV en bolo, repetir cada 3-5 minutos si necesario. Maximo: 3 mg",
                    "cuidadosEnfermeria": [
                        "Tener jeringa precargada en cabecera del paciente con lesion cervical",
                        "Monitorizar ECG continuo",
                        "Vigilar respuesta en FC post-administracion",
                        "Precaucion: puede causar retencion urinaria (ya presente en lesion medular)"
                    ]
                },
                {
                    "nombre": "Heparina de bajo peso molecular (enoxaparina)",
                    "grupo": "Anticoagulante profilactico",
                    "mecanismo": "Inhibe factor Xa para prevenir trombosis venosa profunda. Los pacientes con lesion medular tienen riesgo extremadamente alto de TVP/TEP (hasta 40% sin profilaxis) por estasis venosa, inmovilidad y hipercoagulabilidad",
                    "dosis": "Enoxaparina 40 mg SC cada 24h. Iniciar dentro de las 72h post-lesion si no hay contraindicacion hemorragica",
                    "cuidadosEnfermeria": [
                        "Administrar en tejido subcutaneo abdominal, rotar sitios",
                        "No aspirar ni frotar post-inyeccion",
                        "Vigilar signos de sangrado (hematomas, melena, epistaxis)",
                        "Controlar recuento plaquetario (riesgo de HIT)",
                        "Combinar con medias compresivas y dispositivos de compresion neumatica"
                    ]
                }
            ],
            "noFarmacologico": [
                "Inmovilizacion con collar cervical rigido y tabla espinal hasta estabilizacion definitiva",
                "Manejo de via aerea: intubacion precoz si lesion cervical alta (C3-C5 compromete diafragma)",
                "Programa de cateterismo intermitente limpio cada 4-6 horas (vejiga neurogenica)",
                "Programa intestinal: dieta rica en fibra, estimulacion digital, supositorios cada 48h",
                "Prevencion de ulceras por presion: cambios posturales cada 2 horas, colchon especial",
                "Rehabilitacion kinesiologica precoz: movilizacion pasiva y activa asistida",
                "Soporte psicologico y acompañamiento familiar desde fase aguda"
            ],
            "quirurgico": [
                "Descompresion medular urgente (dentro de 24h si compresion medular progresiva)",
                "Fijacion y artrodesis vertebral (estabilizacion instrumentada de columna inestable)",
                "Reduccion cerrada de luxaciones cervicales con halo craneal y traccion",
                "Laminectomia descompresiva en canal estrecho con compresion posterior"
            ]
        },
        "cuidadosEnfermeria": {
            "valoracion": [
                "Evaluacion neurologica con escala ASIA cada turno en fase aguda",
                "Monitorizar PA y FC continuamente (shock neurogenico)",
                "Evaluar patron respiratorio y capacidad vital (lesiones cervicales)",
                "Valorar funcion vesical: distension abdominal, globo vesical residual",
                "Valorar funcion intestinal: presencia de peristaltismo, distension",
                "Inspeccionar piel en prominencias oseas cada turno"
            ],
            "intervenciones": [
                "Mantener inmovilizacion de columna hasta estabilizacion quirurgica",
                "Administrar vasopresores para mantener PAM > 85 mmHg",
                "Realizar cateterismo vesical intermitente cada 4-6 horas",
                "Implementar programa intestinal con horario regular",
                "Cambios posturales cada 2 horas con tecnica de log-roll",
                "Prevencion de TVP: medias compresivas + heparina + ejercicios pasivos",
                "Mantener via aerea permeable: aspiracion de secreciones, tos asistida"
            ],
            "educacionPaciente": [
                "Enseñar autocateterismo vesical intermitente cuando sea posible",
                "Instruir sobre manejo intestinal autonomo",
                "Educar sobre prevencion y deteccion de ulceras por presion",
                "Explicar signos de disreflexia autonomica y actuacion inmediata",
                "Enseñar ejercicios de fortalecimiento y transferencias",
                "Informar sobre recursos de rehabilitacion y reinsercion social",
                "Apoyo emocional: duelo por la perdida funcional, derivar a psicologia"
            ],
            "monitorizacion": [
                "Signos vitales cada hora en fase aguda (PA, FC, FR, SpO2, T°)",
                "Balance hidrico cada 4 horas",
                "Evaluacion neurologica ASIA cada 8-12 horas",
                "Volumen de cateterismo vesical (objetivo < 500 mL por cateterizacion)",
                "Inspeccion cutanea cada turno en prominencias oseas",
                "Capacidad vital forzada diaria en lesiones cervicales"
            ]
        },
        "npiNanda": [
            {
                "codigo": "00085",
                "nombre": "Deterioro de la movilidad fisica",
                "definicion": "Limitacion del movimiento fisico independiente e intencionado del cuerpo o de una o mas extremidades",
                "caracteristicasDefinitorias": [
                    "Incapacidad para mover extremidades inferiores o las cuatro extremidades",
                    "Disminucion de la fuerza muscular",
                    "Espasticidad o flacidez muscular",
                    "Dependencia total para movilidad"
                ],
                "factoresRelacionados": [
                    "Lesion medular con daño de vias motoras",
                    "Paralisis por debajo del nivel de lesion",
                    "Espasticidad muscular"
                ]
            },
            {
                "codigo": "00016",
                "nombre": "Deterioro de la eliminacion urinaria",
                "definicion": "Disfuncion en la eliminacion de orina",
                "caracteristicasDefinitorias": [
                    "Retencion urinaria",
                    "Incontinencia por rebosamiento",
                    "Infecciones urinarias recurrentes",
                    "Ausencia de sensacion de vejiga llena"
                ],
                "factoresRelacionados": [
                    "Vejiga neurogenica por lesion medular",
                    "Perdida de control voluntario del esfinter",
                    "Disinergia detrusor-esfinter"
                ]
            },
            {
                "codigo": "00047",
                "nombre": "Riesgo de deterioro de la integridad cutanea",
                "definicion": "Vulnerable a una alteracion en epidermis y/o dermis que puede comprometer la salud",
                "caracteristicasDefinitorias": [
                    "Inmovilidad prolongada",
                    "Perdida de sensibilidad",
                    "Humedad por incontinencia"
                ],
                "factoresRelacionados": [
                    "Presion sostenida en prominencias oseas",
                    "Perdida de sensibilidad protectora",
                    "Inmovilidad por paralisis",
                    "Alteracion de la circulacion"
                ]
            }
        ],
        "npiNic": [
            {
                "codigo": "0840",
                "nombre": "Cambio de posicion",
                "actividades": [
                    "Realizar cambios posturales cada 2 horas con tecnica de log-roll",
                    "Utilizar almohadas para alinear columna y proteger prominencias",
                    "Inspeccionar piel en cada cambio de posicion",
                    "Documentar posicion y hora en registro de enfermeria",
                    "Coordinar con fisioterapia para movilizacion segura"
                ]
            },
            {
                "codigo": "0580",
                "nombre": "Sondaje vesical intermitente",
                "actividades": [
                    "Realizar cateterismo con tecnica aseptica cada 4-6 horas",
                    "Registrar volumen de orina obtenido en cada cateterismo",
                    "Evaluar residuo post-miccional si hay miccion espontanea",
                    "Enseñar autocateterismo al paciente cuando sea viable",
                    "Vigilar signos de infeccion urinaria"
                ]
            },
            {
                "codigo": "2660",
                "nombre": "Manejo de la disreflexia autonomica",
                "actividades": [
                    "Reconocer signos: hipertension subita, cefalea, sudoracion, rubor facial",
                    "Sentar al paciente inmediatamente (reduce PA por efecto gravitacional)",
                    "Buscar y eliminar estimulo desencadenante (vejiga distendida, fecaloma, ropa ajustada)",
                    "Vaciar vejiga con sondaje si esta distendida",
                    "Administrar nifedipina sublingual si PA no desciende y notificar al medico"
                ]
            }
        ],
        "npiNoc": [
            {
                "codigo": "0208",
                "nombre": "Movilidad",
                "indicadores": [
                    "Mantenimiento de posicion corporal",
                    "Movimiento articular en rangos preservados",
                    "Capacidad de transferencia (cama-silla)",
                    "Ambulacion con dispositivos de ayuda si aplica"
                ],
                "escala": "1=Gravemente comprometido, 2=Sustancialmente comprometido, 3=Moderadamente comprometido, 4=Levemente comprometido, 5=No comprometido"
            },
            {
                "codigo": "1101",
                "nombre": "Integridad tisular: piel y membranas mucosas",
                "indicadores": [
                    "Piel intacta en prominencias oseas",
                    "Temperatura cutanea normal",
                    "Hidratacion cutanea adecuada",
                    "Ausencia de lesiones por presion"
                ],
                "escala": "1=Gravemente comprometido, 2=Sustancialmente comprometido, 3=Moderadamente comprometido, 4=Levemente comprometido, 5=No comprometido"
            }
        ],
        "complicaciones": [
            "Disreflexia autonomica (emergencia hipertensiva en lesiones sobre T6)",
            "Trombosis venosa profunda y tromboembolismo pulmonar",
            "Ulceras por presion (sacro, trocanteres, talones, isquiones)",
            "Infecciones urinarias recurrentes y litiasis renal",
            "Neumonias por hipoventilacion y acumulacion de secreciones",
            "Osificacion heterotopica (formacion de hueso en tejidos blandos)",
            "Dolor neuropatico cronico por debajo de la lesion",
            "Depresion y trastorno de adaptacion"
        ],
        "criteriosAlarma": [
            "Hipertension subita > 200/100 mmHg con cefalea (disreflexia autonomica)",
            "Deterioro del nivel neurologico (progresion del nivel de lesion)",
            "Dificultad respiratoria progresiva (fallo diafragmatico en lesion cervical)",
            "Fiebre con orina turbia o maloliente (infeccion urinaria complicada)",
            "Signos de TEP: disnea subita, dolor toracico, desaturacion",
            "Lesion cutanea en prominencia osea que no blanquea (UPP grado I)"
        ],
        "emergencyLevel": "critico",
        "relatedPathologyIds": [
            "pat_tce",
            "pat_politraumatismo",
            "pat_fracturas_extremidades",
            "pat_tvp"
        ],
        "isPremium": False
    },

    # =====================================================================
    # 5. TRAUMA TORACICO
    # =====================================================================
    {
        "id": "pat_trauma_toracico",
        "nombre": "Trauma Toracico",
        "bodySystemId": "traumatologico",
        "definicion": "Lesion traumatica de la pared toracica y/o su contenido (pulmones, corazon, grandes vasos, esofago, arbol traqueobronquial y diafragma) causada por mecanismo cerrado o penetrante. Es responsable del 25% de las muertes por trauma. La mayoria se resuelve con tubo de drenaje toracico sin necesidad de toracotomia.",
        "epidemiologia": "Presente en el 50% de los politraumatismos. Causa directa del 25% de las muertes por trauma. El 85% se maneja con drenaje toracico y medidas de soporte. Solo el 10-15% requiere toracotomia. Las fracturas costales son la lesion mas frecuente. El neumotorax a tension y el taponamiento cardiaco son las emergencias letales mas importantes, ambas diagnosticables clinicamente sin necesidad de imagen.",
        "factoresRiesgo": [
            "Accidentes de transito (impacto frontal con volante, aplastamiento)",
            "Caidas de altura",
            "Heridas por arma blanca o arma de fuego en torax",
            "Explosiones (onda expansiva causa blast pulmonar)",
            "Deportes de contacto y violencia interpersonal",
            "Edad avanzada (mayor fragilidad costal, menor reserva pulmonar)",
            "EPOC o patologia pulmonar preexistente",
            "Uso de anticoagulantes (mayor riesgo de hemotorax)"
        ],
        "fisiopatologia": "El trauma toracico altera la mecanica respiratoria y/o la funcion cardiovascular. El neumotorax a tension se produce cuando el aire entra al espacio pleural por un mecanismo valvular unidireccional: el pulmon se colapsa, el mediastino se desvia al lado contralateral comprimiendo el pulmon sano y las venas cavas, reduciendo el retorno venoso y causando shock obstructivo rapidamente fatal. El hemotorax resulta de hemorragia en espacio pleural por lesion de vasos intercostales, parenquima pulmonar o grandes vasos. El taponamiento cardiaco se produce por acumulacion de sangre en pericardio (tan poco como 150-200 mL pueden ser fatales) que comprime las camaras cardiacas impidiendo el llenado diastolico. El torax inestable (volet costal) ocurre cuando tres o mas costillas se fracturan en dos puntos cada una, creando un segmento flotante con movimiento paradojico que compromete la ventilacion; sin embargo, la contusion pulmonar subyacente es la principal causa de insuficiencia respiratoria.",
        "signosYSintomas": {
            "signos": [
                "Ausencia de murmullo vesicular unilateral (neumotorax, hemotorax)",
                "Hipotension con ingurgitacion yugular (taponamiento cardiaco, neumotorax a tension)",
                "Desviacion traqueal contralateral (neumotorax a tension)",
                "Enfisema subcutaneo (crepitacion palpable en piel)",
                "Movimiento paradojico de pared toracica (torax inestable)",
                "Matidez a la percusion (hemotorax) o timpanismo (neumotorax)",
                "Triada de Beck: hipotension, ingurgitacion yugular, tonos cardiacos apagados (taponamiento)",
                "Taquicardia y taquipnea"
            ],
            "sintomas": [
                "Disnea (sintoma mas frecuente)",
                "Dolor toracico que aumenta con la respiracion",
                "Dificultad para respirar profundamente",
                "Sensacion de presion en el pecho",
                "Ansiedad y sensacion de muerte inminente"
            ]
        },
        "clasificacion": {
            "nombre": "Clasificacion segun lesion predominante",
            "tipos": [
                {
                    "nombre": "Neumotorax a tension",
                    "descripcion": "Emergencia letal. Aire a presion en espacio pleural con colapso pulmonar y desviacion mediastinal. Diagnostico CLINICO, tratamiento INMEDIATO con descompresion con aguja (2do espacio intercostal linea medioclavicular)"
                },
                {
                    "nombre": "Hemotorax masivo",
                    "descripcion": "Acumulacion > 1500 mL de sangre en espacio pleural o drenaje > 200 mL/h por 2-4 horas. Requiere drenaje toracico y posible toracotomia"
                },
                {
                    "nombre": "Taponamiento cardiaco",
                    "descripcion": "Sangre en pericardio que impide llenado cardiaco. Triada de Beck clasica. Tratamiento: pericardiocentesis de emergencia o toracotomia"
                },
                {
                    "nombre": "Torax inestable (volet costal)",
                    "descripcion": "Fractura de 3+ costillas consecutivas en 2 puntos. Segmento flotante con respiracion paradojica. La contusion pulmonar subyacente determina la gravedad"
                }
            ]
        },
        "diagnostico": {
            "anamnesis": [
                "Mecanismo de trauma (cerrado vs penetrante, velocidad, arma utilizada)",
                "Localizacion del impacto o la herida",
                "Tiempo transcurrido desde el evento",
                "Dificultad respiratoria progresiva o subita",
                "Dolor toracico y su relacion con la respiracion",
                "Hemoptisis (sugiere lesion pulmonar o via aerea)"
            ],
            "examenFisico": [
                "Inspeccion: asimetria toracica, heridas, movimiento paradojico, uso de musculos accesorios",
                "Palpacion: crepitacion costal, enfisema subcutaneo, desviacion traqueal",
                "Percusion: matidez (hemotorax/derrame) o timpanismo (neumotorax)",
                "Auscultacion: murmullo vesicular bilateral, tonos cardiacos",
                "Evaluacion de ingurgitacion yugular (aumentada en taponamiento y neumotorax a tension)",
                "Saturacion de oxigeno y patron respiratorio"
            ],
            "pruebas": [
                {
                    "nombre": "Radiografia de torax anteroposterior",
                    "descripcion": "Estudio inicial en trauma toracico. Detecta neumotorax (> 10%), hemotorax (> 200 mL), fracturas costales, ensanchamiento mediastinal (sospecha de lesion aortica). Se realiza en posicion supina en el paciente traumatizado",
                    "valoresReferencia": "Normal: pulmones expandidos bilateralmente, senos costodiafragmaticos libres, mediastino de ancho normal, sin fracturas",
                    "cuidadosEnfermeria": [
                        "Mantener inmovilizacion cervical si no descartada lesion",
                        "Radiografia portatil en sala de emergencia (no trasladar paciente inestable)",
                        "Evaluar resultado inmediatamente con equipo de trauma",
                        "Preparar equipo de drenaje toracico si hallazgos patologicos"
                    ]
                },
                {
                    "nombre": "EFAST (Extended FAST)",
                    "descripcion": "Ecografia rapida que incluye ventanas pulmonares para detectar neumotorax (ausencia de deslizamiento pleural) y hemotorax, ademas de las ventanas abdominales y pericardica. Sensibilidad > 95% para neumotorax",
                    "valoresReferencia": "Normal: deslizamiento pleural bilateral presente, sin derrame pleural ni pericardico. Patologico: ausencia de sliding (neumotorax), coleccion en senos (hemotorax), derrame pericardico",
                    "cuidadosEnfermeria": [
                        "Facilitar acceso al torax (retirar ropa)",
                        "Puede realizarse simultaneamente con la reanimacion",
                        "Documentar hallazgos y comunicar al equipo",
                        "Preparar para intervencion segun resultado"
                    ]
                },
                {
                    "nombre": "Tomografia computarizada de torax con contraste",
                    "descripcion": "Estudio mas sensible para neumotorax oculto, contusion pulmonar, lesion de grandes vasos y fracturas. Solo en paciente hemodinamicamente estable",
                    "valoresReferencia": "Normal: parenquima pulmonar sin opacidades, sin colecciones pleurales, aorta y vasos de calibre normal, sin fracturas",
                    "cuidadosEnfermeria": [
                        "Solo trasladar si paciente estable hemodinamicamente",
                        "Via periferica gruesa para contraste IV",
                        "Monitorizar durante el traslado y el estudio",
                        "Comunicar alergia a contraste iodado si existe"
                    ]
                }
            ]
        },
        "tratamientoMedico": {
            "objetivos": [
                "Identificar y tratar lesiones inmediatamente letales (neumotorax a tension, taponamiento cardiaco, hemotorax masivo)",
                "Restaurar la mecanica respiratoria y el intercambio gaseoso",
                "Controlar la hemorragia intratoracica",
                "Mantener estabilidad hemodinamica",
                "Analgesia efectiva para permitir ventilacion adecuada"
            ],
            "farmacologico": [
                {
                    "nombre": "Bloqueo intercostal con bupivacaina",
                    "grupo": "Anestesico local de larga duracion",
                    "mecanismo": "Bloquea la conduccion nerviosa intercostal, proporcionando analgesia de 6-12 horas. Mejora la mecanica respiratoria al permitir respiracion profunda y tos efectiva, reduciendo riesgo de atelectasia y neumonia",
                    "dosis": "Bupivacaina 0.5%: 2-3 mL por nivel intercostal, bloqueando el nervio afectado y los adyacentes superior e inferior. Maximo: 2 mg/kg",
                    "cuidadosEnfermeria": [
                        "Verificar ausencia de alergia a anestesicos locales tipo amida",
                        "Monitorizar signos de toxicidad sistemica (mareo, tinnitus, convulsiones)",
                        "Evaluar eficacia analgesica post-bloqueo con escala de dolor",
                        "Vigilar neumotorax iatrogeno post-procedimiento (complicacion rara)"
                    ]
                },
                {
                    "nombre": "Ketorolac",
                    "grupo": "AINE (antiinflamatorio no esteroideo)",
                    "mecanismo": "Inhibe la ciclooxigenasa (COX-1 y COX-2) reduciendo la sintesis de prostaglandinas. Potente analgesico con efecto ahorrador de opioides en dolor por fracturas costales",
                    "dosis": "30 mg IV cada 6-8 horas. Maximo 5 dias de uso. Reducir a 15 mg en ancianos o insuficiencia renal",
                    "cuidadosEnfermeria": [
                        "Administrar IV lento en 15 segundos minimo",
                        "Vigilar sangrado gastrointestinal y funcion renal",
                        "Contraindicado en insuficiencia renal, ulcera peptica activa y coagulopatia",
                        "Combinar con opioide para analgesia multimodal"
                    ]
                },
                {
                    "nombre": "Morfina IV titulada",
                    "grupo": "Opioide analgesico mayor",
                    "mecanismo": "Agonista mu opioide para analgesia potente. En trauma toracico, el dolor mal controlado limita la ventilacion y causa atelectasia, neumonia y fallo respiratorio",
                    "dosis": "2-4 mg IV cada 5-10 min hasta control del dolor. Infusion continua: 1-3 mg/h. PCA si disponible",
                    "cuidadosEnfermeria": [
                        "Monitorizar FR (suspender si FR < 10 rpm)",
                        "Tener naloxona disponible (0.4 mg IV)",
                        "Evaluar dolor con EVA antes y despues de dosis",
                        "Balance entre analgesia y depresion respiratoria",
                        "Vigilar sedacion excesiva con escala de Ramsay"
                    ]
                }
            ],
            "noFarmacologico": [
                "Descompresion con aguja (14G, 2do espacio intercostal, linea medioclavicular) en neumotorax a tension (antes de Rx)",
                "Tubo de drenaje toracico (28-32 Fr) en 5to espacio intercostal, linea axilar media",
                "Oxigenoterapia con FiO2 segun necesidad (canula nasal, mascara o ARM)",
                "Ventilacion mecanica no invasiva o invasiva si insuficiencia respiratoria",
                "Posicion semisentada para facilitar la mecanica respiratoria",
                "Kinesioterapia respiratoria precoz: inspirometria incentivada, tos asistida"
            ],
            "quirurgico": [
                "Toracotomia de emergencia (taponamiento cardiaco no respondedor, hemorragia masiva, lesion de grandes vasos)",
                "Toracotomia de resucitacion en paro cardiaco traumatico por herida penetrante",
                "Videotoracoscopia (VATS) para hemotorax retenido o fuga aerea persistente",
                "Fijacion quirurgica de fracturas costales (torax inestable severo con ventilacion mecanica prolongada)",
                "Pericardiocentesis de emergencia guiada por ecografia (puente a toracotomia en taponamiento)"
            ]
        },
        "cuidadosEnfermeria": {
            "valoracion": [
                "Evaluar patron respiratorio: FR, profundidad, simetria, uso de musculos accesorios",
                "Auscultar campos pulmonares bilateralmente cada hora",
                "Monitorizar SpO2 continua y gasometria arterial segun indicacion",
                "Evaluar dolor con escala EVA y su impacto en la ventilacion",
                "Inspeccionar heridas penetrantes y su evolucion",
                "Vigilar debito del tubo de drenaje toracico (cantidad, color, oscilacion)"
            ],
            "intervenciones": [
                "Mantener permeabilidad del tubo de drenaje toracico (ordeñar si coagulos)",
                "Registrar debito del drenaje cada hora (volumen y caracteristicas)",
                "Administrar analgesia pautada y rescate para permitir ventilacion efectiva",
                "Fomentar kinesioterapia respiratoria: inspirometria incentivada cada 1-2 horas",
                "Mantener sello de agua del drenaje (nunca elevar frasco por encima del torax)",
                "Aspirar secreciones si paciente en ventilacion mecanica"
            ],
            "educacionPaciente": [
                "Enseñar ejercicios respiratorios y uso de inspirometro incentivado",
                "Explicar la importancia de la tos efectiva a pesar del dolor",
                "Instruir sobre cuidados del drenaje toracico si se va a domicilio con el",
                "Educar sobre signos de alarma: dificultad respiratoria, fiebre, dolor que empeora",
                "Explicar el proceso de recuperacion y tiempos esperados",
                "Instruir sobre limitacion de actividad fisica y retorno gradual"
            ],
            "monitorizacion": [
                "SpO2 continua y gasometria arterial seriada",
                "Debito del drenaje toracico cada hora (alertar si > 200 mL/h)",
                "Radiografia de torax de control post-drenaje y diaria",
                "Signos vitales cada hora en fase aguda (PA, FC, FR, T°)",
                "Evaluacion del dolor cada 2-4 horas"
            ]
        },
        "npiNanda": [
            {
                "codigo": "00032",
                "nombre": "Patron respiratorio ineficaz",
                "definicion": "Inspiracion y/o espiracion que no proporciona una ventilacion adecuada",
                "caracteristicasDefinitorias": [
                    "Disnea",
                    "Taquipnea",
                    "Uso de musculos accesorios",
                    "Disminucion de la expansion toracica",
                    "Respiracion superficial por dolor"
                ],
                "factoresRelacionados": [
                    "Dolor por fracturas costales",
                    "Neumotorax o hemotorax",
                    "Torax inestable",
                    "Contusion pulmonar"
                ]
            },
            {
                "codigo": "00030",
                "nombre": "Deterioro del intercambio gaseoso",
                "definicion": "Exceso o deficit en la oxigenacion y/o eliminacion de dioxido de carbono a traves de la membrana alveolocapilar",
                "caracteristicasDefinitorias": [
                    "Hipoxemia (PaO2 < 60 mmHg)",
                    "Hipercapnia",
                    "Cianosis central",
                    "Disnea y agitacion"
                ],
                "factoresRelacionados": [
                    "Contusion pulmonar con shunt intrapulmonar",
                    "Colapso pulmonar por neumotorax",
                    "Hemotorax que comprime parenquima",
                    "Atelectasia por hipoventilacion"
                ]
            },
            {
                "codigo": "00132",
                "nombre": "Dolor agudo",
                "definicion": "Experiencia sensitiva y emocional desagradable asociada a daño tisular real o potencial",
                "caracteristicasDefinitorias": [
                    "Expresion facial de dolor",
                    "Proteccion del area afectada",
                    "Taquicardia",
                    "Restriccion voluntaria de la respiracion"
                ],
                "factoresRelacionados": [
                    "Fracturas costales",
                    "Lesion de tejidos blandos de pared toracica",
                    "Tubo de drenaje toracico in situ"
                ]
            }
        ],
        "npiNic": [
            {
                "codigo": "3350",
                "nombre": "Monitorizacion respiratoria",
                "actividades": [
                    "Auscultar campos pulmonares bilateralmente cada hora",
                    "Monitorizar SpO2 continua y correlacionar con clinica",
                    "Evaluar patron respiratorio: frecuencia, profundidad, simetria",
                    "Solicitar gasometria arterial ante cambios en oxigenacion",
                    "Detectar signos precoces de insuficiencia respiratoria"
                ]
            },
            {
                "codigo": "1872",
                "nombre": "Cuidado del drenaje toracico",
                "actividades": [
                    "Verificar integridad del sistema de drenaje (conexiones, sello de agua)",
                    "Registrar debito horario: volumen, color, presencia de burbujeo",
                    "Mantener frasco recolector por debajo del nivel del torax",
                    "Evaluar oscilacion del nivel de agua con la respiracion (confirma permeabilidad)",
                    "Clampar solo cuando se indica (cambio de frasco) nunca de rutina"
                ]
            },
            {
                "codigo": "1400",
                "nombre": "Manejo del dolor",
                "actividades": [
                    "Evaluar dolor con escala EVA sistematicamente",
                    "Administrar analgesia pautada + rescates (no esperar que el paciente pida)",
                    "Implementar analgesia multimodal (AINE + opioide + bloqueo regional)",
                    "Evaluar impacto del dolor en la mecanica respiratoria",
                    "Coordinar administracion de analgesia con kinesioterapia respiratoria"
                ]
            }
        ],
        "npiNoc": [
            {
                "codigo": "0415",
                "nombre": "Estado respiratorio",
                "indicadores": [
                    "Frecuencia respiratoria en rango normal (12-20 rpm)",
                    "SpO2 > 95%",
                    "Expansion toracica simetrica",
                    "Murmullo vesicular presente bilateralmente",
                    "Ausencia de disnea en reposo"
                ],
                "escala": "1=Desviacion grave, 2=Desviacion sustancial, 3=Desviacion moderada, 4=Desviacion leve, 5=Sin desviacion"
            },
            {
                "codigo": "2102",
                "nombre": "Nivel del dolor",
                "indicadores": [
                    "Dolor referido (EVA < 4 en reposo)",
                    "Capacidad de respirar profundamente",
                    "Capacidad de toser efectivamente",
                    "Ausencia de restriccion ventilatoria por dolor"
                ],
                "escala": "1=Grave, 2=Sustancial, 3=Moderado, 4=Leve, 5=Ninguno"
            }
        ],
        "complicaciones": [
            "Neumotorax a tension (letal si no se descomprime)",
            "Hemotorax masivo con shock hemorragico",
            "Taponamiento cardiaco",
            "Contusion pulmonar con SDRA",
            "Contusion miocardica con arritmias",
            "Rotura traumatica de aorta toracica",
            "Empiema (infeccion de hemotorax retenido)",
            "Neumonia nosocomial post-traumatica"
        ],
        "criteriosAlarma": [
            "Ausencia unilateral de murmullo vesicular con inestabilidad hemodinamica (neumotorax a tension)",
            "Debito del drenaje toracico > 200 mL/h por 2-4 horas (hemotorax masivo: indicacion quirurgica)",
            "Triada de Beck: hipotension + yugulares ingurgitadas + ruidos cardiacos apagados (taponamiento)",
            "SpO2 < 90% a pesar de oxigenoterapia",
            "Enfisema subcutaneo rapidamente progresivo",
            "Inestabilidad hemodinamica refractaria a reposicion"
        ],
        "emergencyLevel": "critico",
        "relatedPathologyIds": [
            "pat_politraumatismo",
            "pat_neumotorax",
            "pat_hemotorax",
            "pat_insuficiencia_respiratoria"
        ],
        "isPremium": False
    },

    # =====================================================================
    # 6. TRAUMA ABDOMINAL
    # =====================================================================
    {
        "id": "pat_trauma_abdominal",
        "nombre": "Trauma Abdominal",
        "bodySystemId": "traumatologico",
        "definicion": "Lesion de la pared abdominal y/o su contenido visceral (organos solidos y huecos) causada por trauma cerrado o penetrante. Es una causa frecuente de hemorragia interna oculta y peritonitis. El diagnostico precoz es clave ya que los hallazgos clinicos iniciales pueden ser sutiles, especialmente en pacientes con alteracion de conciencia.",
        "epidemiologia": "Presente en el 20-30% de los politraumatismos. El bazo y el higado son los organos mas frecuentemente lesionados en trauma cerrado (40% y 35% respectivamente). En trauma penetrante, el intestino delgado es el mas afectado. La mortalidad del trauma hepatico severo alcanza el 50%. Los accidentes de transito y la violencia son las principales causas.",
        "factoresRiesgo": [
            "Accidentes de transito (impacto con volante, cinturon de seguridad mal colocado)",
            "Heridas por arma blanca en abdomen",
            "Heridas por arma de fuego (alta energia, multiples lesiones)",
            "Caidas de altura con impacto abdominal",
            "Maltrato infantil (lesion hepatica o esplenica por golpe)",
            "Deportes de contacto (impacto directo en abdomen)",
            "Esplenomegalia previa (bazo mas vulnerable a ruptura)",
            "Uso de anticoagulantes (mayor sangrado ante lesion menor)"
        ],
        "fisiopatologia": "En trauma cerrado, la lesion se produce por compresion directa (aplastamiento de organos contra columna vertebral), desaceleracion (desgarro de pedículos vasculares por inercia, como la lesion de arteria esplenica o venas hepaticas) o aumento subito de presion intraabdominal (ruptura de visceras huecas). Los organos solidos (bazo, higado, riñones) sangran profusamente al romperse su capsula. Los organos huecos (intestino, vejiga, estomago) producen peritonitis por fuga de contenido. En trauma penetrante, la lesion depende de la trayectoria del agente (arma blanca: lesion predecible, arma de fuego: cavitacion temporal y permanente con daño impredecible). El peritoneo puede contener inicialmente 1-1.5 L de sangre antes de que aparezcan signos clinicos evidentes, lo que convierte al abdomen en una cavidad potencialmente silenciosa y letal.",
        "signosYSintomas": {
            "signos": [
                "Defensa abdominal voluntaria e involuntaria (rigidez de pared)",
                "Dolor a la descompresion (signo de Blumberg positivo: peritonitis)",
                "Distension abdominal progresiva",
                "Ausencia de ruidos hidroaereos (ileo paralitico)",
                "Signo de Kehr (dolor referido en hombro izquierdo por irritacion diafragmatica, sugiere lesion esplenica)",
                "Equimosis periumbilical (signo de Cullen) o en flancos (signo de Grey-Turner): hemorragia retroperitoneal",
                "Marca del cinturon de seguridad en abdomen (sospechar lesion intestinal)",
                "Hipotension con taquicardia (hemorragia intraabdominal)"
            ],
            "sintomas": [
                "Dolor abdominal difuso o localizado",
                "Nauseas y vomitos",
                "Sensacion de distension abdominal",
                "Dolor referido en hombros (irritacion diafragmatica)",
                "Incapacidad para tolerar la palpacion abdominal"
            ]
        },
        "clasificacion": {
            "nombre": "Clasificacion segun mecanismo y organo afectado",
            "tipos": [
                {
                    "nombre": "Trauma cerrado (no penetrante)",
                    "descripcion": "Sin solucion de continuidad en peritoneo. Organos mas afectados: bazo (40%), higado (35%). Diagnostico con FAST y TAC. Alta sospecha de lesiones ocultas"
                },
                {
                    "nombre": "Trauma penetrante por arma blanca",
                    "descripcion": "Lesion predecible segun trayectoria. Organos mas afectados: higado (40%), intestino delgado (30%). Exploracion local de herida para determinar si penetra peritoneo"
                },
                {
                    "nombre": "Trauma penetrante por arma de fuego",
                    "descripcion": "Alta energia con cavitacion. Lesiones multiples e impredecibles. Organos: intestino delgado (50%), colon (40%), higado (30%). Generalmente requiere laparotomia"
                },
                {
                    "nombre": "Manejo no operatorio (NOM)",
                    "descripcion": "Seleccion de pacientes hemodinamicamente estables con lesion de organo solido (bazo, higado) para observacion y TAC seriadas. Exito > 85% en lesiones esplenicas y hepaticas grado I-III"
                }
            ]
        },
        "diagnostico": {
            "anamnesis": [
                "Mecanismo de lesion detallado (cinematica del trauma)",
                "Tipo de arma si penetrante (calibre, largo de hoja)",
                "Uso de cinturon de seguridad y tipo de vehiculo",
                "Tiempo desde el evento",
                "Dolor abdominal y su evolucion temporal",
                "Ultima ingesta (riesgo de aspiracion si requiere cirugia)"
            ],
            "examenFisico": [
                "Inspeccion: heridas, equimosis, distension, marcas de cinturon",
                "Palpacion: defensa muscular, dolor a la descompresion, masas palpables",
                "Percusion: matidez en flancos (liquido libre), timpanismo (aire libre)",
                "Auscultacion: presencia o ausencia de ruidos hidroaereos",
                "Exploracion de heridas penetrantes (no introducir instrumentos a ciegas)",
                "Tacto rectal: sangre (lesion intestinal), tono del esfinter, posicion prostatica"
            ],
            "pruebas": [
                {
                    "nombre": "FAST (Focused Assessment with Sonography in Trauma)",
                    "descripcion": "Ecografia en 4 puntos para detectar liquido libre intraperitoneal. Sensibilidad 85-95% para hemoperitoneo > 200 mL. FAST positivo + inestabilidad hemodinamica = laparotomia urgente sin TAC",
                    "valoresReferencia": "Negativo: sin liquido libre. Positivo: banda anecoica entre organos. Indeterminado: repetir en 30 minutos",
                    "cuidadosEnfermeria": [
                        "Facilitar acceso al abdomen rapidamente",
                        "Mantener monitorizacion durante el estudio",
                        "Comunicar resultado inmediatamente al cirujano",
                        "Si positivo e inestable: preparar para quirofano de urgencia"
                    ]
                },
                {
                    "nombre": "Tomografia computarizada de abdomen y pelvis con contraste IV",
                    "descripcion": "Gold standard en paciente estable. Identifica tipo y grado de lesion de organos solidos (escala AAST), liquido libre, aire libre, lesiones vasculares con extravasacion de contraste (blush). Permite decision de manejo operatorio vs no operatorio",
                    "valoresReferencia": "Normal: organos sin laceracion ni hematoma, sin liquido libre, sin aire libre. Grados de lesion (AAST): I-V para cada organo",
                    "cuidadosEnfermeria": [
                        "Solo en paciente hemodinamicamente estable (PAS > 90 mmHg respondiendo a fluidos)",
                        "Via periferica gruesa para contraste IV",
                        "Monitorizar signos vitales durante y despues del estudio",
                        "Comunicar alergia a contraste iodado",
                        "Preparar para quirofano si hallazgos lo ameritan"
                    ]
                },
                {
                    "nombre": "Lavado peritoneal diagnostico (LPD)",
                    "descripcion": "Infusion de 1L de SF en peritoneo y aspiracion posterior. Positivo si GR > 100.000/mm3, GB > 500/mm3, amilasa elevada, presencia de bilis o contenido intestinal. Reservado para centros sin FAST ni TAC disponible",
                    "valoresReferencia": "Positivo: GR > 100.000/mm3, GB > 500/mm3, amilasa > 175 U/L, presencia de bilis, fibras alimentarias o materia fecal",
                    "cuidadosEnfermeria": [
                        "Vaciar vejiga con sonda vesical antes del procedimiento",
                        "Colocar sonda nasogastrica para descomprimir estomago",
                        "Asistir al medico con tecnica esteril",
                        "Enviar muestra a laboratorio con caracter urgente"
                    ]
                }
            ]
        },
        "tratamientoMedico": {
            "objetivos": [
                "Identificar y controlar hemorragia intraabdominal",
                "Determinar necesidad de cirugia urgente vs manejo no operatorio",
                "Prevenir peritonitis por perforacion de viscera hueca",
                "Mantener estabilidad hemodinamica",
                "Monitorizar pacientes en manejo no operatorio con reevaluacion clinica e imagenologica seriada"
            ],
            "farmacologico": [
                {
                    "nombre": "Acido tranexamico",
                    "grupo": "Antifibrinolitico",
                    "mecanismo": "Reduce mortalidad por hemorragia traumatica al inhibir fibrinolisis. Administrar dentro de las primeras 3 horas del trauma segun protocolo CRASH-2",
                    "dosis": "1 g IV en 10 minutos, seguido de 1 g IV en 8 horas. No administrar si > 3 horas del trauma",
                    "cuidadosEnfermeria": [
                        "Administrar primera dosis lo antes posible",
                        "Registrar hora del trauma y hora de administracion",
                        "Vigilar signos de trombosis",
                        "Diluir en 100 mL de SF para infusion"
                    ]
                },
                {
                    "nombre": "Antibioticos de amplio espectro",
                    "grupo": "Antibioticoterapia profilactica/terapeutica",
                    "mecanismo": "Cobertura contra flora intestinal en lesion de viscera hueca (gram negativos y anaerobios). Previenen sepsis abdominal y formacion de abscesos",
                    "dosis": "Piperacilina-tazobactam 4.5 g IV cada 6h, o metronidazol 500 mg IV cada 8h + ceftriaxona 2 g IV cada 24h. Iniciar preoperatorio si sospecha de perforacion",
                    "cuidadosEnfermeria": [
                        "Administrar primera dosis antes de cirugia (profilaxis)",
                        "Verificar alergias a penicilina o cefalosporinas",
                        "Monitorizar temperatura y leucocitos como respuesta",
                        "Ajustar segun cultivos si se obtienen muestras intraoperatorias"
                    ]
                },
                {
                    "nombre": "Cristaloides y hemoderivados",
                    "grupo": "Reposicion volemica",
                    "mecanismo": "Ringer Lactato o solucion fisiologica para reposicion inicial. Hemoderivados (GR, PFC, plaquetas 1:1:1) ante hemorragia significativa. Hipotension permisiva hasta control quirurgico",
                    "dosis": "Bolo inicial 1-2 L de RL tibio. Hemoderivados si no responde o hemorragia activa. Objetivo: PAS 80-90 mmHg (hipotension permisiva) hasta hemostasia quirurgica",
                    "cuidadosEnfermeria": [
                        "Dos vias perifericas gruesas (14-16G)",
                        "Calentar fluidos a 39°C con calentador",
                        "Monitorizar respuesta a volumen cada 15 min",
                        "Solicitar sangre O negativo si urgencia extrema",
                        "Balance hidrico estricto"
                    ]
                }
            ],
            "noFarmacologico": [
                "Manejo no operatorio (NOM) en lesiones esplenicas y hepaticas grado I-III con estabilidad hemodinamica",
                "Reposo absoluto en cama durante NOM con monitorizacion hemodinamica continua",
                "TAC de control a las 24-48h en pacientes en NOM",
                "Sonda nasogastrica si sospecha de ileo o lesion gastrica",
                "Sonda vesical para control de diuresis horaria",
                "Nada por boca hasta evaluar necesidad de cirugia"
            ],
            "quirurgico": [
                "Laparotomia exploratoria urgente: FAST + e inestable, peritonitis generalizada, evisceración, o herida por arma de fuego",
                "Cirugia de control de daños: packing hepatico, esplenectomia rapida, ligadura de vasos, cierre temporal de abdomen",
                "Esplenectomia (parcial o total) en lesion esplenica severa. Post-esplenectomia: vacunacion contra neumococo, meningococo, H. influenzae",
                "Rafia intestinal o reseccion con anastomosis en lesion de viscera hueca",
                "Angioembolizacion selectiva para sangrado arterial activo (blush en TAC) en paciente estable"
            ]
        },
        "cuidadosEnfermeria": {
            "valoracion": [
                "Evaluar abdomen cada 30-60 min: distension, dolor, defensa, ruidos intestinales",
                "Monitorizar signos vitales continuos (PA, FC, FR, SpO2)",
                "Control de diuresis horaria como indicador de perfusion renal",
                "Evaluar signos de sangrado oculto: taquicardia progresiva, palidez, caida de Hb",
                "Valorar heridas penetrantes: sangrado activo, evisceración",
                "Inspeccionar marcas de cinturon, equimosis, abrasiones"
            ],
            "intervenciones": [
                "Canalizar dos vias perifericas gruesas y extraer muestras para laboratorio y banco de sangre",
                "Colocar sonda vesical y nasogastrica segun indicacion",
                "Mantener nada por boca hasta decision quirurgica",
                "Cubrir evisceración con gasas humedas en solucion fisiologica tibia (no reintroducir)",
                "Preparar al paciente para quirofano con consentimiento informado urgente",
                "Administrar antibioticos profilacticos segun indicacion"
            ],
            "educacionPaciente": [
                "Explicar a la familia el plan de tratamiento (operatorio vs observacion)",
                "Instruir sobre signos de alarma post-alta: dolor abdominal que empeora, fiebre, mareo",
                "Educar sobre restriccion de actividad fisica durante recuperacion (6-8 semanas)",
                "En caso de esplenectomia: explicar vacunacion obligatoria y riesgo de sepsis post-esplenectomia",
                "Enseñar cuidados de herida quirurgica y cuando consultar",
                "Importancia de control ambulatorio con imagenes de seguimiento"
            ],
            "monitorizacion": [
                "Signos vitales cada 15-30 min en fase aguda, luego cada hora",
                "Hemoglobina seriada cada 4-6 horas en primeras 24-48h",
                "Diuresis horaria (objetivo > 0.5 mL/kg/h)",
                "Examen abdominal seriado por el mismo evaluador (detectar cambios sutiles)",
                "Balance hidrico estricto cada 4 horas"
            ]
        },
        "npiNanda": [
            {
                "codigo": "00206",
                "nombre": "Riesgo de sangrado",
                "definicion": "Vulnerable a una disminucion del volumen de sangre que puede comprometer la salud",
                "caracteristicasDefinitorias": [
                    "Hemorragia intraabdominal oculta o activa",
                    "Caida de hemoglobina en controles seriados",
                    "Taquicardia e hipotension progresivas",
                    "Distension abdominal creciente"
                ],
                "factoresRelacionados": [
                    "Lesion de organo solido (bazo, higado)",
                    "Lesion vascular mesenterica",
                    "Coagulopatia por consumo"
                ]
            },
            {
                "codigo": "00004",
                "nombre": "Riesgo de infeccion",
                "definicion": "Vulnerable a la invasion y multiplicacion de organismos patogenos que pueden comprometer la salud",
                "caracteristicasDefinitorias": [
                    "Contaminacion peritoneal por contenido intestinal",
                    "Herida abierta en abdomen",
                    "Procedimientos invasivos multiples"
                ],
                "factoresRelacionados": [
                    "Perforacion de viscera hueca",
                    "Procedimientos quirurgicos abdominales",
                    "Cateterizaciones multiples (SV, SNG, via central)"
                ]
            },
            {
                "codigo": "00025",
                "nombre": "Riesgo de desequilibrio del volumen de liquidos",
                "definicion": "Vulnerable a una disminucion, aumento o rapido cambio entre compartimientos del volumen de liquido intravascular, intersticial o intracelular",
                "caracteristicasDefinitorias": [
                    "Hemorragia activa o potencial",
                    "Tercer espacio post-quirurgico",
                    "Reposicion masiva de fluidos"
                ],
                "factoresRelacionados": [
                    "Hemorragia por lesion visceral",
                    "Respuesta inflamatoria con fuga capilar",
                    "Reposicion volemica agresiva"
                ]
            }
        ],
        "npiNic": [
            {
                "codigo": "6650",
                "nombre": "Vigilancia",
                "actividades": [
                    "Monitorizar signos vitales con frecuencia establecida",
                    "Realizar examen abdominal seriado buscando cambios",
                    "Controlar hemoglobina seriada y tendencia",
                    "Evaluar diuresis como indicador de perfusion",
                    "Comunicar cambios significativos al equipo quirurgico inmediatamente"
                ]
            },
            {
                "codigo": "4030",
                "nombre": "Administracion de hemoderivados",
                "actividades": [
                    "Verificar compatibilidad (grupo, factor, prueba cruzada)",
                    "Administrar hemoderivados con filtro y calentador",
                    "Monitorizar signos de reaccion transfusional cada 15 min",
                    "Registrar unidades, hora de inicio y finalizacion",
                    "Controlar calcio ionico post-transfusion masiva"
                ]
            },
            {
                "codigo": "2900",
                "nombre": "Asistencia quirurgica",
                "actividades": [
                    "Preparar al paciente para quirofano (consentimiento, laboratorio, banco de sangre)",
                    "Verificar ayuno e identificacion del paciente",
                    "Completar checklist de seguridad quirurgica (OMS)",
                    "Comunicar alergias y antecedentes relevantes al equipo quirurgico",
                    "Preparar insumos anticipados para cirugia de control de daños"
                ]
            }
        ],
        "npiNoc": [
            {
                "codigo": "0413",
                "nombre": "Severidad de la perdida de sangre",
                "indicadores": [
                    "Hemoglobina estable o en ascenso",
                    "PA mantenida sin vasopresores",
                    "Ausencia de distension abdominal progresiva",
                    "Diuresis > 0.5 mL/kg/h"
                ],
                "escala": "1=Grave, 2=Sustancial, 3=Moderado, 4=Leve, 5=Ninguno"
            },
            {
                "codigo": "0703",
                "nombre": "Severidad de la infeccion",
                "indicadores": [
                    "Temperatura < 38°C",
                    "Leucocitos en rango normal",
                    "Herida sin signos de infeccion",
                    "Ausencia de colecciones intraabdominales"
                ],
                "escala": "1=Grave, 2=Sustancial, 3=Moderado, 4=Leve, 5=Ninguno"
            }
        ],
        "complicaciones": [
            "Shock hemorragico por hemorragia intraabdominal no controlada",
            "Peritonitis difusa por perforacion de viscera hueca",
            "Abscesos intraabdominales post-operatorios",
            "Sindrome compartimental abdominal (PIA > 20 mmHg con disfuncion organica)",
            "Fistulas enterocutaneas post-quirurgicas",
            "Sepsis post-esplenectomia fulminante (OPSI: infeccion abrumadora)",
            "Ileo paralitico prolongado",
            "Adherencias intestinales y obstruccion tardia"
        ],
        "criteriosAlarma": [
            "FAST positivo con inestabilidad hemodinamica (laparotomia urgente)",
            "Peritonitis generalizada (abdomen en tabla)",
            "Caida de hemoglobina > 2 g/dL en 4 horas",
            "Necesidad de > 4 unidades de GR en primeras 2 horas",
            "Evisceración traumatica",
            "Distension abdominal progresiva con deterioro hemodinamico",
            "Fiebre > 38.5°C con dolor abdominal creciente post-NOM"
        ],
        "emergencyLevel": "critico",
        "relatedPathologyIds": [
            "pat_politraumatismo",
            "pat_trauma_toracico",
            "pat_shock_hipovolemico",
            "pat_peritonitis"
        ],
        "isPremium": False
    },

    # =====================================================================
    # 7. FRACTURAS DE EXTREMIDADES
    # =====================================================================
    {
        "id": "pat_fracturas_extremidades",
        "nombre": "Fracturas de Extremidades",
        "bodySystemId": "traumatologico",
        "definicion": "Perdida de la continuidad osea parcial o total en huesos de miembros superiores o inferiores causada por un traumatismo que supera la resistencia mecanica del hueso. Pueden comprometer estructuras neurovasculares adyacentes y requerir desde inmovilizacion con yeso hasta cirugia reconstructiva compleja.",
        "epidemiologia": "Las fracturas de extremidades son las lesiones traumaticas mas frecuentes. Incidencia de 11-12 por 1.000 habitantes/año. Distribucion bimodal: jovenes (trauma de alta energia: accidentes, deportes) y ancianos (trauma de baja energia: caidas con osteoporosis). La fractura de femur proximal en ancianos tiene mortalidad del 20-30% al año. Las fracturas abiertas representan el 5-10% del total y tienen riesgo elevado de infeccion y no union.",
        "factoresRiesgo": [
            "Accidentes de transito (trauma de alta energia)",
            "Caidas en adultos mayores (osteoporosis: principal factor)",
            "Actividades deportivas de alto impacto",
            "Osteoporosis (reduce resistencia osea significativamente)",
            "Deficiencia de vitamina D y calcio",
            "Uso cronico de corticoides (osteoporosis secundaria)",
            "Tumores oseos primarios o metastasis (fracturas patologicas)",
            "Violencia interpersonal",
            "Accidentes laborales"
        ],
        "fisiopatologia": "La fractura ocurre cuando la fuerza aplicada supera la resistencia mecanica del hueso. Los mecanismos incluyen: fuerza directa (impacto en el sitio de fractura), fuerza indirecta (transmision a distancia: caida sobre mano produce fractura de colles en radio distal o fractura de clavicula), traccion (avulsion por insercion muscular o ligamentaria), fatiga (microfracturas por estres repetitivo). Al producirse la fractura, hay rotura de vasos intraoseos con formacion de hematoma. La cascada de reparacion osea incluye: fase inflamatoria (dias 1-7, hematoma, reclutamiento celular), fase de callo blando (semanas 2-3, tejido fibrocartilaginoso), fase de callo duro (semanas 4-16, osificacion), y remodelacion (meses-años). Las fracturas abiertas (clasificacion de Gustilo-Anderson) tienen exposicion del foco fracturario al exterior con riesgo de contaminacion e infeccion. El sindrome compartimental es la complicacion aguda mas temida: el edema y la hemorragia post-fractura aumentan la presion dentro de un compartimiento fascial cerrado, comprimiendo vasos y nervios, causando isquemia irreversible en 6-8 horas si no se realiza fasciotomia.",
        "signosYSintomas": {
            "signos": [
                "Deformidad visible del miembro (angulacion, rotacion, acortamiento)",
                "Crepitacion osea a la palpacion (no buscar activamente)",
                "Edema y equimosis en foco de fractura",
                "Impotencia funcional (incapacidad de mover o cargar peso)",
                "Movilidad anormal en sitio de fractura",
                "Acortamiento de la extremidad (fracturas de femur)",
                "Exposicion de fragmentos oseos en fracturas abiertas",
                "Pulsos perifericos ausentes o disminuidos (compromiso vascular)"
            ],
            "sintomas": [
                "Dolor intenso localizado que aumenta con el movimiento",
                "Sensacion de crujido al momento del trauma",
                "Incapacidad de mover la extremidad afectada",
                "Hormigueo o entumecimiento distal (compromiso nervioso)",
                "Sensacion de inestabilidad en la extremidad"
            ]
        },
        "clasificacion": {
            "nombre": "Clasificacion de Gustilo-Anderson (fracturas abiertas)",
            "tipos": [
                {
                    "nombre": "Tipo I",
                    "descripcion": "Herida < 1 cm, limpia, de adentro hacia afuera. Fractura simple. Contaminacion minima. Bajo riesgo de infeccion (0-2%)"
                },
                {
                    "nombre": "Tipo II",
                    "descripcion": "Herida 1-10 cm, contaminacion moderada. Daño de tejidos blandos moderado sin colgajos. Riesgo de infeccion 2-10%"
                },
                {
                    "nombre": "Tipo IIIA",
                    "descripcion": "Herida > 10 cm, alta energia, pero cobertura de tejidos blandos adecuada. Fracturas segmentarias. Riesgo de infeccion 10-25%"
                },
                {
                    "nombre": "Tipo IIIB y IIIC",
                    "descripcion": "IIIB: perdida extensa de tejidos blandos con exposicion osea, requiere colgajo. IIIC: lesion vascular que requiere reparacion. Riesgo de infeccion 25-50%. Alta tasa de amputacion"
                }
            ]
        },
        "diagnostico": {
            "anamnesis": [
                "Mecanismo de lesion (alta o baja energia, directo o indirecto)",
                "Localizacion exacta del dolor",
                "Capacidad de mover la extremidad y cargar peso post-trauma",
                "Momento del ultimo consumo de alimentos (si requiere cirugia)",
                "Antecedentes: osteoporosis, fracturas previas, tratamiento con corticoides",
                "Estado de vacunacion antitetanica (en fracturas abiertas)"
            ],
            "examenFisico": [
                "Inspeccion: deformidad, edema, equimosis, heridas abiertas, exposicion osea",
                "Palpacion suave: dolor exquisito localizado, crepitacion (no provocar intencionalmente)",
                "Evaluacion neurovascular distal: pulsos, llenado capilar, sensibilidad, movilidad de dedos",
                "Evaluacion de compartimientos musculares: dolor al estiramiento pasivo (sindrome compartimental)",
                "Evaluacion de articulaciones proximal y distal a la fractura",
                "Evaluar piel en busca de heridas abiertas (clasificar Gustilo si fractura expuesta)"
            ],
            "pruebas": [
                {
                    "nombre": "Radiografia de la extremidad afectada (2 proyecciones minimo)",
                    "descripcion": "Estudio inicial obligatorio. Se solicitan dos proyecciones (AP y lateral) incluyendo la articulacion proximal y distal. Permite clasificar el tipo de fractura, desplazamiento y planificar tratamiento",
                    "valoresReferencia": "Normal: cortical intacta, trabeculado regular, alineacion anatomica. Patologico: linea de fractura, desplazamiento, conminucion, perdida de alineacion",
                    "cuidadosEnfermeria": [
                        "Inmovilizar la extremidad antes de trasladar a radiologia",
                        "No retirar ferula para la radiografia (se puede ver a traves del yeso)",
                        "Incluir articulacion superior e inferior en la placa",
                        "Manejar al paciente con cuidado para no aumentar el dolor"
                    ]
                },
                {
                    "nombre": "Tomografia computarizada de la fractura",
                    "descripcion": "Indicada en fracturas articulares, de pelvis, meseta tibial y pilón tibial para planificacion quirurgica. Superior para evaluar conminucion y depresion articular",
                    "valoresReferencia": "Detalla patron de fractura, numero de fragmentos, compromiso articular y desplazamiento en 3D",
                    "cuidadosEnfermeria": [
                        "Mantener inmovilizacion durante el estudio",
                        "Analgesia previa si movilizacion causa dolor intenso",
                        "Estudio no urgente, puede diferirse si paciente inestable"
                    ]
                },
                {
                    "nombre": "Medicion de presion intracompartimental",
                    "descripcion": "Indicada ante sospecha de sindrome compartimental. Se introduce aguja conectada a transductor en el compartimiento afectado. Presion > 30 mmHg o delta P (PAD - Pcompartimental) < 30 mmHg indica fasciotomia urgente",
                    "valoresReferencia": "Normal: < 10 mmHg. Alerta: 20-30 mmHg. Critico: > 30 mmHg o delta P < 30 mmHg → fasciotomia urgente",
                    "cuidadosEnfermeria": [
                        "Reconocer signos clinicos precoces: dolor desproporcionado, dolor al estiramiento pasivo de dedos",
                        "No esperar las 5 P clasicas (Pain, Pallor, Pulselessness, Paresthesia, Paralysis): los pulsos se pierden ULTIMO",
                        "Retirar inmediatamente vendajes compresivos o yesos que puedan estar contribuyendo",
                        "Comunicar urgentemente al traumatologo ante sospecha"
                    ]
                }
            ]
        },
        "tratamientoMedico": {
            "objetivos": [
                "Reduccion anatomica de la fractura (alinear fragmentos)",
                "Fijacion estable que permita movilizacion precoz",
                "Preservar la funcion neurovascular de la extremidad",
                "Prevenir y detectar sindrome compartimental precozmente",
                "Prevenir infeccion en fracturas abiertas (antibioticos + lavado quirurgico)"
            ],
            "farmacologico": [
                {
                    "nombre": "Cefazolina",
                    "grupo": "Cefalosporina de primera generacion (antibiotico profilactico)",
                    "mecanismo": "Cobertura contra Staphylococcus aureus y Streptococcus, principales patogenos en infecciones de fracturas abiertas. Profilaxis obligatoria en toda fractura abierta y en fijacion quirurgica",
                    "dosis": "Gustilo I-II: Cefazolina 2 g IV, luego 1 g cada 8h por 24-48h. Gustilo III: agregar gentamicina 5 mg/kg/dia + metronidazol 500 mg IV cada 8h si contaminacion con tierra",
                    "cuidadosEnfermeria": [
                        "Administrar primera dosis dentro de las primeras 3 horas del trauma",
                        "Verificar alergia a penicilina/cefalosporinas (usar clindamicina si alergia)",
                        "En cirugia: administrar 30-60 min antes de la incision",
                        "No prolongar profilaxis mas de 72h (aumenta resistencia sin beneficio)"
                    ]
                },
                {
                    "nombre": "Ketorolac + Tramadol (analgesia multimodal)",
                    "grupo": "AINE + Opioide debil",
                    "mecanismo": "Ketorolac inhibe COX con potente efecto analgesico; Tramadol actua en receptores mu y recaptacion de serotonina/noradrenalina. Combinacion reduce necesidad de opioides mayores",
                    "dosis": "Ketorolac 30 mg IV cada 8h (max 5 dias). Tramadol 50-100 mg IV/VO cada 6-8h. Maximo: tramadol 400 mg/dia",
                    "cuidadosEnfermeria": [
                        "Evaluar dolor con EVA antes y despues de administrar",
                        "Vigilar efectos adversos de tramadol: nauseas, mareos, somnolencia",
                        "Ketorolac: vigilar sangrado GI y funcion renal",
                        "Administrar rescate con morfina si dolor no controlado"
                    ]
                },
                {
                    "nombre": "Enoxaparina (tromboprofilaxis)",
                    "grupo": "Heparina de bajo peso molecular",
                    "mecanismo": "Inhibe factor Xa para prevenir TVP. Las fracturas de extremidades inferiores y la inmovilizacion aumentan significativamente el riesgo tromboembolico",
                    "dosis": "40 mg SC cada 24h. Iniciar 6-12h post-cirugia. Mantener hasta deambulacion completa o 4-6 semanas en fractura de cadera/femur",
                    "cuidadosEnfermeria": [
                        "Administrar en tejido subcutaneo abdominal alternando lados",
                        "No aspirar ni frotar post-inyeccion",
                        "Vigilar signos de sangrado o hematomas",
                        "Combinar con medias compresivas y movilizacion precoz",
                        "Controlar plaquetas semanalmente (riesgo de HIT)"
                    ]
                }
            ],
            "noFarmacologico": [
                "Inmovilizacion inicial con ferula en posicion funcional antes del tratamiento definitivo",
                "Protocolo RICE en primeras 48h: Reposo, hielo (Ice) 20 min cada 2h, Compresion, Elevacion de la extremidad",
                "Reduccion cerrada e inmovilizacion con yeso o ferula en fracturas estables no desplazadas",
                "Elevacion de la extremidad por encima del nivel del corazon para reducir edema",
                "Rehabilitacion kinesiologica precoz: movilizacion articular temprana, fortalecimiento progresivo",
                "Soporte nutricional: adecuada ingesta de calcio (1000-1200 mg/dia) y vitamina D (800-1000 UI/dia)"
            ],
            "quirurgico": [
                "Reduccion abierta y fijacion interna (RAFI) con placas, tornillos o clavos intramedulares para fracturas desplazadas o articulares",
                "Fijacion externa: para fracturas abiertas Gustilo III, fracturas con daño severo de tejidos blandos o control de daños en politraumatismo",
                "Fasciotomia urgente en sindrome compartimental (incision de todas las fascias del compartimiento afectado)",
                "Lavado quirurgico y desbridamiento de fracturas abiertas (idealmente dentro de las 6 horas)",
                "Artroplastia (protesis): indicada en fracturas de cuello femoral desplazadas en ancianos"
            ]
        },
        "cuidadosEnfermeria": {
            "valoracion": [
                "Evaluacion neurovascular distal cada 1-2 horas post-inmovilizacion o cirugia: pulsos, sensibilidad, movilidad, llenado capilar, color y temperatura",
                "Evaluar dolor con escala EVA y correlacionar con hallazgos (dolor desproporcionado = alarma)",
                "Inspeccionar inmovilizacion (yeso, ferula): presion excesiva, bordes cortantes, humedad",
                "Valorar edema distal y comparar con extremidad contralateral",
                "Evaluar herida quirurgica o sitio de fractura abierta: sangrado, signos de infeccion",
                "Valorar estado emocional y capacidad de autocuidado"
            ],
            "intervenciones": [
                "Elevar extremidad afectada sobre almohadas por encima del nivel cardiaco",
                "Aplicar hielo envuelto en tela por 20 min cada 2 horas en primeras 48h",
                "Vigilar circulacion distal estrictamente tras colocacion de yeso (las primeras 24-48h son criticas)",
                "Alinear extremidad en posicion funcional y evitar presion sobre prominencias oseas",
                "Asistir en movilizacion temprana segun indicacion medica (transferencias, uso de muletas)",
                "Curacion de herida quirurgica con tecnica aseptica"
            ],
            "educacionPaciente": [
                "Enseñar signos de alarma en yeso: dolor que no cede, hormigueo, dedos morados, frios o sin movimiento → consultar urgente",
                "Instruir sobre cuidados del yeso: mantener seco, no introducir objetos dentro, elevar extremidad",
                "Enseñar uso correcto de muletas o andador segun prescripcion de carga",
                "Educar sobre importancia de la rehabilitacion y ejercicios de rango articular",
                "Instruir sobre prevencion de TVP: movilizar dedos y tobillo frecuentemente",
                "Explicar tiempos de consolidacion esperados segun localizacion"
            ],
            "monitorizacion": [
                "Evaluacion neurovascular distal cada 1-2 horas en primeras 24-48h post-reduccion/cirugia",
                "Control de dolor cada 4 horas con escala EVA",
                "Vigilancia de signos de sindrome compartimental: las 6 P (Pain out of proportion, Pressure, Paresthesia, Paralysis, Pallor, Pulselessness)",
                "Hemoglobina de control si fractura de femur o sangrado significativo",
                "Temperatura y signos de infeccion en fracturas abiertas"
            ]
        },
        "npiNanda": [
            {
                "codigo": "00132",
                "nombre": "Dolor agudo",
                "definicion": "Experiencia sensitiva y emocional desagradable asociada a daño tisular real o potencial",
                "caracteristicasDefinitorias": [
                    "Expresion verbal y facial de dolor",
                    "Proteccion de la extremidad afectada",
                    "Taquicardia por dolor",
                    "Dificultad para el movimiento"
                ],
                "factoresRelacionados": [
                    "Fractura osea con edema y espasmo muscular",
                    "Lesion de tejidos blandos perilesionales",
                    "Procedimientos de reduccion e inmovilizacion"
                ]
            },
            {
                "codigo": "00085",
                "nombre": "Deterioro de la movilidad fisica",
                "definicion": "Limitacion del movimiento fisico independiente e intencionado del cuerpo o de una o mas extremidades",
                "caracteristicasDefinitorias": [
                    "Inmovilizacion por ferula o yeso",
                    "Incapacidad de cargar peso en extremidad afectada",
                    "Limitacion del rango de movimiento articular",
                    "Dependencia para actividades de la vida diaria"
                ],
                "factoresRelacionados": [
                    "Fractura osea",
                    "Inmovilizacion terapeutica",
                    "Dolor al movimiento"
                ]
            },
            {
                "codigo": "00086",
                "nombre": "Riesgo de disfuncion neurovascular periferica",
                "definicion": "Vulnerable a una alteracion en la circulacion, sensibilidad o movimiento de una extremidad que puede comprometer la salud",
                "caracteristicasDefinitorias": [
                    "Fractura con edema significativo",
                    "Inmovilizacion con yeso cerrado",
                    "Disminucion de pulsos distales"
                ],
                "factoresRelacionados": [
                    "Compresion por edema dentro de compartimiento fascial",
                    "Inmovilizacion externa constrictiva",
                    "Lesion vascular por fragmentos oseos"
                ]
            }
        ],
        "npiNic": [
            {
                "codigo": "2660",
                "nombre": "Manejo de la sensibilidad periferica alterada",
                "actividades": [
                    "Evaluar pulsos distales, llenado capilar, sensibilidad y movilidad cada hora",
                    "Comparar con extremidad contralateral",
                    "Aflojar vendajes si signos de compromiso neurovascular",
                    "Elevar extremidad para reducir edema",
                    "Comunicar inmediatamente cambios al medico"
                ]
            },
            {
                "codigo": "0910",
                "nombre": "Inmovilizacion",
                "actividades": [
                    "Mantener alineacion anatomica de la extremidad",
                    "Verificar integridad de la inmovilizacion (yeso, ferula, traccion)",
                    "Proteger prominencias oseas bajo el yeso con almohadillado",
                    "Vigilar que la inmovilizacion no sea constrictiva",
                    "Instruir al paciente sobre cuidados de la inmovilizacion"
                ]
            },
            {
                "codigo": "1400",
                "nombre": "Manejo del dolor",
                "actividades": [
                    "Evaluar dolor con escala EVA sistematicamente",
                    "Administrar analgesia multimodal segun prescripcion",
                    "Aplicar hielo local (crioterapia) en primeras 48h",
                    "Posicionar extremidad para minimizar dolor (elevacion, alineacion)",
                    "Investigar dolor desproporcionado o progresivo como signo de alarma (sindrome compartimental)"
                ]
            }
        ],
        "npiNoc": [
            {
                "codigo": "0407",
                "nombre": "Perfusion tisular: periferica",
                "indicadores": [
                    "Pulsos distales palpables y simetricos",
                    "Llenado capilar < 2 segundos",
                    "Sensibilidad conservada en dedos",
                    "Color y temperatura de piel normal",
                    "Movilidad activa de dedos"
                ],
                "escala": "1=Desviacion grave, 2=Desviacion sustancial, 3=Desviacion moderada, 4=Desviacion leve, 5=Sin desviacion"
            },
            {
                "codigo": "2102",
                "nombre": "Nivel del dolor",
                "indicadores": [
                    "Dolor referido controlado (EVA < 4)",
                    "Capacidad de participar en rehabilitacion",
                    "Patron de sueño no alterado por dolor",
                    "Sin necesidad de rescates frecuentes de opioides"
                ],
                "escala": "1=Grave, 2=Sustancial, 3=Moderado, 4=Leve, 5=Ninguno"
            }
        ],
        "complicaciones": [
            "Sindrome compartimental (emergencia quirurgica: fasciotomia dentro de 6h)",
            "Embolia grasa (12-72h post-fractura de huesos largos: petequias, hipoxemia, confusion)",
            "Trombosis venosa profunda y tromboembolismo pulmonar",
            "Infeccion de sitio quirurgico y osteomielitis (especialmente fracturas abiertas)",
            "Pseudoartrosis (falta de consolidacion > 6 meses)",
            "Consolidacion viciosa (consolidacion en mala posicion)",
            "Lesion neurovascular por fragmentos oseos desplazados",
            "Rigidez articular post-inmovilizacion prolongada"
        ],
        "criteriosAlarma": [
            "Dolor desproporcionado que no cede con analgesia (sindrome compartimental)",
            "Dolor al estiramiento pasivo de dedos (signo mas precoz de sindrome compartimental)",
            "Ausencia de pulsos distales (compromiso vascular: emergencia)",
            "Parestesias o paralisis distal de inicio agudo",
            "Fiebre > 38.5°C con eritema y secrecion en herida (infeccion)",
            "Disnea subita con petequias axilares 24-72h post-fractura (embolia grasa)",
            "Yeso mojado, roto o que causa presion excesiva"
        ],
        "emergencyLevel": "moderado",
        "relatedPathologyIds": [
            "pat_politraumatismo",
            "pat_tvp",
            "pat_tep",
            "pat_osteoporosis"
        ],
        "isPremium": False
    }
]


def main():
    # Leer pathologies.json existente
    with open(DATA_PATH, 'r', encoding='utf-8') as f:
        data = json.load(f)

    print(f"Patologias existentes: {len(data)}")

    # Verificar que no haya duplicados
    existing_ids = {p['id'] for p in data}
    new_ids = {p['id'] for p in trauma_pathologies}
    duplicates = existing_ids & new_ids
    if duplicates:
        print(f"ADVERTENCIA: IDs duplicados encontrados, se reemplazaran: {duplicates}")
        data = [p for p in data if p['id'] not in duplicates]

    # Agregar nuevas patologias
    data.extend(trauma_pathologies)

    # Escribir de vuelta
    with open(DATA_PATH, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f"Patologias de trauma agregadas: {len(trauma_pathologies)}")

    # Validar JSON
    with open(DATA_PATH, 'r', encoding='utf-8') as f:
        validated = json.loads(f.read())

    print(f"JSON validado correctamente.")
    print(f"Total de patologias: {len(validated)}")

    # Verificar las patologias de trauma
    trauma = [p for p in validated if p['bodySystemId'] == 'traumatologico']
    print(f"Patologias traumatologicas: {len(trauma)}")
    for p in trauma:
        print(f"  - {p['id']}: {p['nombre']}")


if __name__ == '__main__':
    main()
