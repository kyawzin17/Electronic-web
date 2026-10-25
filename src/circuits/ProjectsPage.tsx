import { useEffect, useState } from "react";
import {
  ArrowLeft,
  CircuitBoard,
  Clock3,
  FolderOpen,
  Plus,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  deleteSavedProject,
  listSavedProjects,
  type SavedCircuitProject,
} from "./projectStorage";
import "./circuit.css";

function formatDate(timestamp: number): string {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(timestamp);
}

export default function ProjectsPage() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<SavedCircuitProject[]>([]);

  const refresh = () => {
    setProjects(listSavedProjects());
  };

  useEffect(() => {
    refresh();
  }, []);

  const openProject = (id: string) => {
    navigate("/circuit/?project=" + encodeURIComponent(id));
  };

  const createProject = () => {
    navigate("/circuit");
  };

  const removeProject = (id: string) => {
    const project = projects.find((item) => item.id === id);
    if (!project) return;

    const confirmed = window.confirm(
      'Delete "' + project.name + '"? This cannot be undone.',
    );

    if (!confirmed) return;

    deleteSavedProject(id);
    refresh();
  };

  const buildInProjects= [
  {
    "id": "project-1791991873555-258ice",
    "name": "First Circuit Simulator!",
    "createdAt": 1791991873555,
    "updatedAt": 1792938872027,
    "nodes": [
        {
            "id": "arduino-uno-1791991730565-98gmb",
            "type": "electronicNode",
            "position": {
                "x": 440,
                "y": 275
            },
            "data": {
                "componentType": "arduino-uno",
                "tag": "wokwi-arduino-uno",
                "props": {},
                "label": "Arduino Uno-1",
                "pins": [
                    {
                        "id": "A5.2",
                        "label": "A5.2",
                        "type": "digital",
                        "direction": "input",
                        "description": "Analog 5.2 pin voltage input."
                    },
                    {
                        "id": "A4.2",
                        "label": "A4.2",
                        "type": "digital",
                        "direction": "input",
                        "description": "Analog 4.2 pin voltage input."
                    },
                    {
                        "id": "AREF",
                        "label": "AREF",
                        "type": "digital",
                        "direction": "input",
                        "description": "Analog reference voltage input."
                    },
                    {
                        "id": "D13",
                        "label": "D13",
                        "alias": "SCK / LED",
                        "type": "digital",
                        "direction": "bidirectional",
                        "protocols": [
                            "spi"
                        ],
                        "features": [
                            "built-in-led"
                        ],
                        "description": "SPI clock pin connected to the Arduino built-in LED."
                    },
                    {
                        "id": "D12",
                        "label": "D12",
                        "alias": "MISO",
                        "type": "digital",
                        "direction": "bidirectional",
                        "protocols": [
                            "spi"
                        ],
                        "description": "Digital pin used as SPI Master In Slave Out."
                    },
                    {
                        "id": "D11",
                        "label": "D11",
                        "alias": "PWM / MOSI",
                        "type": "digital",
                        "direction": "bidirectional",
                        "protocols": [
                            "spi"
                        ],
                        "features": [
                            "pwm"
                        ],
                        "description": "Digital pin with PWM support and SPI MOSI functionality."
                    },
                    {
                        "id": "D10",
                        "label": "D10",
                        "alias": "PWM / SS",
                        "type": "digital",
                        "direction": "bidirectional",
                        "protocols": [
                            "spi"
                        ],
                        "features": [
                            "pwm"
                        ],
                        "description": "Digital pin with PWM support. Can also be used as SPI Slave Select."
                    },
                    {
                        "id": "D9",
                        "label": "D9",
                        "alias": "PWM",
                        "type": "digital",
                        "direction": "bidirectional",
                        "features": [
                            "pwm"
                        ],
                        "description": "Digital input/output pin with PWM support."
                    },
                    {
                        "id": "D8",
                        "label": "D8",
                        "type": "digital",
                        "direction": "bidirectional",
                        "description": "General purpose digital input/output pin."
                    },
                    {
                        "id": "D7",
                        "label": "D7",
                        "type": "digital",
                        "direction": "bidirectional",
                        "description": "General purpose digital input/output pin."
                    },
                    {
                        "id": "D6",
                        "label": "D6",
                        "alias": "PWM",
                        "type": "digital",
                        "direction": "bidirectional",
                        "features": [
                            "pwm"
                        ],
                        "description": "Digital input/output pin with PWM support."
                    },
                    {
                        "id": "D5",
                        "label": "D5",
                        "alias": "PWM",
                        "type": "digital",
                        "direction": "bidirectional",
                        "features": [
                            "pwm"
                        ],
                        "description": "Digital input/output pin with PWM support."
                    },
                    {
                        "id": "D4",
                        "label": "D4",
                        "type": "digital",
                        "direction": "bidirectional",
                        "description": "General purpose digital input/output pin."
                    },
                    {
                        "id": "D3",
                        "label": "D3",
                        "alias": "PWM",
                        "type": "digital",
                        "direction": "bidirectional",
                        "features": [
                            "pwm",
                            "interrupt"
                        ],
                        "description": "Digital input/output pin with PWM and external interrupt support."
                    },
                    {
                        "id": "D2",
                        "label": "D2",
                        "type": "digital",
                        "direction": "bidirectional",
                        "features": [
                            "interrupt"
                        ],
                        "description": "Digital input/output pin with external interrupt support."
                    },
                    {
                        "id": "D1",
                        "label": "D1",
                        "alias": "TX",
                        "type": "digital",
                        "direction": "bidirectional",
                        "protocols": [
                            "uart"
                        ],
                        "description": "UART transmit pin. Connected to the onboard USB serial interface."
                    },
                    {
                        "id": "D0",
                        "label": "D0",
                        "alias": "RX",
                        "type": "digital",
                        "direction": "bidirectional",
                        "protocols": [
                            "uart"
                        ],
                        "description": "UART receive pin. Connected to the onboard USB serial interface."
                    },
                    {
                        "id": "A0",
                        "label": "A0",
                        "type": "analog",
                        "direction": "input",
                        "features": [
                            "adc"
                        ],
                        "description": "Analog input channel 0. Can also be used as a digital pin."
                    },
                    {
                        "id": "A1",
                        "label": "A1",
                        "type": "analog",
                        "direction": "input",
                        "features": [
                            "adc"
                        ],
                        "description": "Analog input channel 1. Can also be used as a digital pin."
                    },
                    {
                        "id": "A2",
                        "label": "A2",
                        "type": "analog",
                        "direction": "input",
                        "features": [
                            "adc"
                        ],
                        "description": "Analog input channel 2. Can also be used as a digital pin."
                    },
                    {
                        "id": "A3",
                        "label": "A3",
                        "type": "analog",
                        "direction": "input",
                        "features": [
                            "adc"
                        ],
                        "description": "Analog input channel 3. Can also be used as a digital pin."
                    },
                    {
                        "id": "A4",
                        "label": "A4",
                        "alias": "SDA",
                        "type": "analog",
                        "direction": "bidirectional",
                        "protocols": [
                            "i2c"
                        ],
                        "features": [
                            "adc"
                        ],
                        "description": "Analog input channel 4 and I2C SDA data line."
                    },
                    {
                        "id": "A5",
                        "label": "A5",
                        "alias": "SCL",
                        "type": "analog",
                        "direction": "bidirectional",
                        "protocols": [
                            "i2c"
                        ],
                        "features": [
                            "adc"
                        ],
                        "description": "Analog input channel 5 and I2C SCL clock line."
                    },
                    {
                        "id": "VIN",
                        "label": "VIN",
                        "type": "power",
                        "direction": "input",
                        "voltage": {
                            "min": 7,
                            "max": 12,
                            "nominal": 9,
                            "unit": "V"
                        },
                        "description": "External power input pin."
                    },
                    {
                        "id": "5V",
                        "label": "5V",
                        "type": "power",
                        "direction": "output",
                        "voltage": {
                            "nominal": 5,
                            "unit": "V"
                        },
                        "description": "Regulated 5V power output."
                    },
                    {
                        "id": "3.3V",
                        "label": "3.3V",
                        "type": "power",
                        "direction": "output",
                        "voltage": {
                            "nominal": 3.3,
                            "unit": "V"
                        },
                        "description": "Regulated 3.3V power output."
                    },
                    {
                        "id": "IOREF",
                        "label": "IOREF",
                        "type": "power",
                        "direction": "output",
                        "voltage": {
                            "nominal": 5,
                            "unit": "V"
                        },
                        "description": "Reference voltage used by the board."
                    },
                    {
                        "id": "GND1",
                        "label": "GND",
                        "alias": "Ground 1",
                        "type": "ground",
                        "direction": "passive",
                        "description": "Ground reference pin."
                    },
                    {
                        "id": "GND2",
                        "label": "GND",
                        "alias": "Ground 2",
                        "type": "ground",
                        "direction": "passive",
                        "description": "Additional ground reference pin."
                    },
                    {
                        "id": "GND3",
                        "label": "GND",
                        "alias": "Ground 3",
                        "type": "ground",
                        "direction": "passive",
                        "description": "Additional ground reference pin."
                    }
                ],
                "stubLength": 5,
                "instanceNumber": 1
            },
            "zIndex": 10,
            "width": 277,
            "height": 210
        },
        {
            "id": "led-red-1791991734135-juzqr",
            "type": "electronicNode",
            "position": {
                "x": 355,
                "y": 275
            },
            "data": {
                "componentType": "led-red",
                "tag": "wokwi-led",
                "props": {
                    "color": "red"
                },
                "label": "Red LED-1",
                "pins": [
                    {
                        "id": "anode",
                        "label": "Anode",
                        "alias": "Positive (+)",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "The positive terminal (Anode) of the LED. Current must flow from Anode to Cathode for the LED to emit light."
                    },
                    {
                        "id": "cathode",
                        "label": "Cathode",
                        "alias": "Negative (-)",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "The negative terminal (Cathode) of the LED. This terminal should typically point towards the ground or negative side of the voltage source."
                    }
                ],
                "stubLength": 5,
                "instanceNumber": 1
            },
            "zIndex": 10,
            "width": 42,
            "height": 52
        },
        {
            "id": "resistor-1791991737014-g2oux",
            "type": "electronicNode",
            "position": {
                "x": 480,
                "y": 230
            },
            "data": {
                "componentType": "resistor",
                "tag": "wokwi-resistor",
                "props": {},
                "label": "Resistor-1",
                "pins": [
                    {
                        "id": "pin1",
                        "label": "Pin 1",
                        "alias": "Terminal 1",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "First passive terminal of the resistor. Because a resistor is non-polarized, terminal A and terminal B are electrically interchangeable."
                    },
                    {
                        "id": "pin2",
                        "label": "Pin 2",
                        "alias": "Terminal 2",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Second passive terminal of the resistor. Because a resistor is non-polarized, terminal B and terminal A are electrically interchangeable."
                    }
                ],
                "stubLength": 5,
                "instanceNumber": 1
            },
            "zIndex": 10,
            "width": 61,
            "height": 26,
            "selected": false,
            "dragging": false,
            "positionAbsolute": {
                "x": 480,
                "y": 230
            }
        }
    ],
    "edges": [
        {
            "type": "editable",
            "zIndex": 1000,
            "id": "wire-1791991740254-33c6n6",
            "source": "arduino-uno-1791991730565-98gmb",
            "sourceHandle": "D13",
            "target": "resistor-1791991737014-g2oux",
            "targetHandle": "pin2",
            "data": {
                "points": null,
                "sourceNodeId": "arduino-uno-1791991730565-98gmb",
                "sourcePinId": "D13",
                "targetNodeId": "resistor-1791991737014-g2oux",
                "targetPinId": "pin2",
                "validation": {
                    "isValid": true
                },
                "simulation": {
                    "isActive": false,
                    "traceActive": false
                }
            },
            "style": {
                "strokeWidth": 2,
                "stroke": "#ef4444"
            },
            "selected": false
        },
        {
            "type": "editable",
            "zIndex": 1000,
            "id": "wire-1791991743386-tj0ywt",
            "source": "resistor-1791991737014-g2oux",
            "sourceHandle": "pin1",
            "target": "led-red-1791991734135-juzqr",
            "targetHandle": "anode",
            "data": {
                "points": [
                    {
                        "x": 482.91285859618665,
                        "y": 243.11286070345972
                    },
                    {
                        "x": 482.91285859618665,
                        "y": 243.11286070345972
                    },
                    {
                        "x": 410,
                        "y": 243.11286070345972
                    },
                    {
                        "x": 410,
                        "y": 288.1128607034597
                    },
                    {
                        "x": 410,
                        "y": 288.1128607034597
                    },
                    {
                        "x": 410,
                        "y": 340
                    },
                    {
                        "x": 382.1059416959501,
                        "y": 340
                    },
                    {
                        "x": 382.1059416959501,
                        "y": 318.31293491423247
                    },
                    {
                        "x": 382.1059416959501,
                        "y": 318.31293491423247
                    }
                ],
                "sourceNodeId": "resistor-1791991737014-g2oux",
                "sourcePinId": "pin1",
                "targetNodeId": "led-red-1791991734135-juzqr",
                "targetPinId": "anode",
                "validation": {
                    "isValid": true
                },
                "simulation": {
                    "isActive": false,
                    "traceActive": false
                }
            },
            "style": {
                "strokeWidth": 2,
                "stroke": "#ef4444"
            },
            "selected": false
        },
        {
            "type": "editable",
            "zIndex": 1000,
            "id": "wire-1791991746404-4xk7ld",
            "source": "led-red-1791991734135-juzqr",
            "sourceHandle": "cathode",
            "target": "arduino-uno-1791991730565-98gmb",
            "targetHandle": "GND1",
            "data": {
                "points": [
                    {
                        "x": 372.10593958867696,
                        "y": 318.31293491423247
                    },
                    {
                        "x": 372.10593958867696,
                        "y": 318.31293491423247
                    },
                    {
                        "x": 372.10593958867696,
                        "y": 500
                    },
                    {
                        "x": 610.6131824210634,
                        "y": 500
                    },
                    {
                        "x": 610.6131824210634,
                        "y": 467.80976002269495
                    },
                    {
                        "x": 610.6131824210634,
                        "y": 467.80976002269495
                    }
                ],
                "sourceNodeId": "led-red-1791991734135-juzqr",
                "sourcePinId": "cathode",
                "targetNodeId": "arduino-uno-1791991730565-98gmb",
                "targetPinId": "GND1",
                "validation": {
                    "isValid": true
                },
                "simulation": {
                    "isActive": false,
                    "traceActive": false
                }
            },
            "style": {
                "strokeWidth": 2,
                "stroke": "#000000"
            },
            "selected": false
        }
    ],
    "code": "void setup() {\n  pinMode(13, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(13, HIGH);\n  delay(1000);\n\n  digitalWrite(13, LOW);\n  delay(1000);\n}\n",
    "selectedLibraries": [],
    "viewport": {
        "x": -425.5703615245394,
        "y": -311.76438616289306,
        "zoom": 1.6516980912250763
    },
    "thumbnail": "data:image/jpeg;base64,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"
},
 {
    "id": "project-1792315039378-uo9yy6",
    "name": "My School project!",
    "createdAt": 1792315039378,
    "updatedAt": 1792918964434,
    "nodes": [
        {
            "id": "arduino-uno-1792314481962-gs2sh",
            "type": "electronicNode",
            "position": {
                "x": 515,
                "y": 360
            },
            "data": {
                "componentType": "arduino-uno",
                "tag": "wokwi-arduino-uno",
                "props": {},
                "label": "Arduino Uno-1",
                "pins": [
                    {
                        "id": "A5.2",
                        "label": "A5.2",
                        "type": "digital",
                        "direction": "input",
                        "description": "Analog 5.2 pin voltage input."
                    },
                    {
                        "id": "A4.2",
                        "label": "A4.2",
                        "type": "digital",
                        "direction": "input",
                        "description": "Analog 4.2 pin voltage input."
                    },
                    {
                        "id": "AREF",
                        "label": "AREF",
                        "type": "digital",
                        "direction": "input",
                        "description": "Analog reference voltage input."
                    },
                    {
                        "id": "D13",
                        "label": "D13",
                        "alias": "SCK / LED",
                        "type": "digital",
                        "direction": "bidirectional",
                        "protocols": [
                            "spi"
                        ],
                        "features": [
                            "built-in-led"
                        ],
                        "description": "SPI clock pin connected to the Arduino built-in LED."
                    },
                    {
                        "id": "D12",
                        "label": "D12",
                        "alias": "MISO",
                        "type": "digital",
                        "direction": "bidirectional",
                        "protocols": [
                            "spi"
                        ],
                        "description": "Digital pin used as SPI Master In Slave Out."
                    },
                    {
                        "id": "D11",
                        "label": "D11",
                        "alias": "PWM / MOSI",
                        "type": "digital",
                        "direction": "bidirectional",
                        "protocols": [
                            "spi"
                        ],
                        "features": [
                            "pwm"
                        ],
                        "description": "Digital pin with PWM support and SPI MOSI functionality."
                    },
                    {
                        "id": "D10",
                        "label": "D10",
                        "alias": "PWM / SS",
                        "type": "digital",
                        "direction": "bidirectional",
                        "protocols": [
                            "spi"
                        ],
                        "features": [
                            "pwm"
                        ],
                        "description": "Digital pin with PWM support. Can also be used as SPI Slave Select."
                    },
                    {
                        "id": "D9",
                        "label": "D9",
                        "alias": "PWM",
                        "type": "digital",
                        "direction": "bidirectional",
                        "features": [
                            "pwm"
                        ],
                        "description": "Digital input/output pin with PWM support."
                    },
                    {
                        "id": "D8",
                        "label": "D8",
                        "type": "digital",
                        "direction": "bidirectional",
                        "description": "General purpose digital input/output pin."
                    },
                    {
                        "id": "D7",
                        "label": "D7",
                        "type": "digital",
                        "direction": "bidirectional",
                        "description": "General purpose digital input/output pin."
                    },
                    {
                        "id": "D6",
                        "label": "D6",
                        "alias": "PWM",
                        "type": "digital",
                        "direction": "bidirectional",
                        "features": [
                            "pwm"
                        ],
                        "description": "Digital input/output pin with PWM support."
                    },
                    {
                        "id": "D5",
                        "label": "D5",
                        "alias": "PWM",
                        "type": "digital",
                        "direction": "bidirectional",
                        "features": [
                            "pwm"
                        ],
                        "description": "Digital input/output pin with PWM support."
                    },
                    {
                        "id": "D4",
                        "label": "D4",
                        "type": "digital",
                        "direction": "bidirectional",
                        "description": "General purpose digital input/output pin."
                    },
                    {
                        "id": "D3",
                        "label": "D3",
                        "alias": "PWM",
                        "type": "digital",
                        "direction": "bidirectional",
                        "features": [
                            "pwm",
                            "interrupt"
                        ],
                        "description": "Digital input/output pin with PWM and external interrupt support."
                    },
                    {
                        "id": "D2",
                        "label": "D2",
                        "type": "digital",
                        "direction": "bidirectional",
                        "features": [
                            "interrupt"
                        ],
                        "description": "Digital input/output pin with external interrupt support."
                    },
                    {
                        "id": "D1",
                        "label": "D1",
                        "alias": "TX",
                        "type": "digital",
                        "direction": "bidirectional",
                        "protocols": [
                            "uart"
                        ],
                        "description": "UART transmit pin. Connected to the onboard USB serial interface."
                    },
                    {
                        "id": "D0",
                        "label": "D0",
                        "alias": "RX",
                        "type": "digital",
                        "direction": "bidirectional",
                        "protocols": [
                            "uart"
                        ],
                        "description": "UART receive pin. Connected to the onboard USB serial interface."
                    },
                    {
                        "id": "A0",
                        "label": "A0",
                        "type": "analog",
                        "direction": "input",
                        "features": [
                            "adc"
                        ],
                        "description": "Analog input channel 0. Can also be used as a digital pin."
                    },
                    {
                        "id": "A1",
                        "label": "A1",
                        "type": "analog",
                        "direction": "input",
                        "features": [
                            "adc"
                        ],
                        "description": "Analog input channel 1. Can also be used as a digital pin."
                    },
                    {
                        "id": "A2",
                        "label": "A2",
                        "type": "analog",
                        "direction": "input",
                        "features": [
                            "adc"
                        ],
                        "description": "Analog input channel 2. Can also be used as a digital pin."
                    },
                    {
                        "id": "A3",
                        "label": "A3",
                        "type": "analog",
                        "direction": "input",
                        "features": [
                            "adc"
                        ],
                        "description": "Analog input channel 3. Can also be used as a digital pin."
                    },
                    {
                        "id": "A4",
                        "label": "A4",
                        "alias": "SDA",
                        "type": "analog",
                        "direction": "bidirectional",
                        "protocols": [
                            "i2c"
                        ],
                        "features": [
                            "adc"
                        ],
                        "description": "Analog input channel 4 and I2C SDA data line."
                    },
                    {
                        "id": "A5",
                        "label": "A5",
                        "alias": "SCL",
                        "type": "analog",
                        "direction": "bidirectional",
                        "protocols": [
                            "i2c"
                        ],
                        "features": [
                            "adc"
                        ],
                        "description": "Analog input channel 5 and I2C SCL clock line."
                    },
                    {
                        "id": "VIN",
                        "label": "VIN",
                        "type": "power",
                        "direction": "input",
                        "voltage": {
                            "min": 7,
                            "max": 12,
                            "nominal": 9,
                            "unit": "V"
                        },
                        "description": "External power input pin."
                    },
                    {
                        "id": "5V",
                        "label": "5V",
                        "type": "power",
                        "direction": "output",
                        "voltage": {
                            "nominal": 5,
                            "unit": "V"
                        },
                        "description": "Regulated 5V power output."
                    },
                    {
                        "id": "3.3V",
                        "label": "3.3V",
                        "type": "power",
                        "direction": "output",
                        "voltage": {
                            "nominal": 3.3,
                            "unit": "V"
                        },
                        "description": "Regulated 3.3V power output."
                    },
                    {
                        "id": "IOREF",
                        "label": "IOREF",
                        "type": "power",
                        "direction": "output",
                        "voltage": {
                            "nominal": 5,
                            "unit": "V"
                        },
                        "description": "Reference voltage used by the board."
                    },
                    {
                        "id": "GND1",
                        "label": "GND",
                        "alias": "Ground 1",
                        "type": "ground",
                        "direction": "passive",
                        "description": "Ground reference pin."
                    },
                    {
                        "id": "GND2",
                        "label": "GND",
                        "alias": "Ground 2",
                        "type": "ground",
                        "direction": "passive",
                        "description": "Additional ground reference pin."
                    },
                    {
                        "id": "GND3",
                        "label": "GND",
                        "alias": "Ground 3",
                        "type": "ground",
                        "direction": "passive",
                        "description": "Additional ground reference pin."
                    }
                ],
                "stubLength": 5,
                "instanceNumber": 1
            },
            "zIndex": 10,
            "width": 277,
            "height": 210,
            "selected": false,
            "positionAbsolute": {
                "x": 515,
                "y": 360
            },
            "dragging": false
        },
        {
            "id": "half-board-1792314487002-9yb4o",
            "type": "breadboardHalfNode",
            "position": {
                "x": 915,
                "y": 290
            },
            "data": {
                "componentType": "half-board",
                "tag": "wokwi-half-board",
                "props": {},
                "label": "Half Breadboard-1",
                "pins": [
                    {
                        "id": "pin_A1",
                        "label": "A1",
                        "alias": "Row 1 Tie-Point A",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point A1 on Row 1 (Left (A-E)). All 5 pins in Row 1 on this side are electrically connected."
                    },
                    {
                        "id": "pin_B1",
                        "label": "B1",
                        "alias": "Row 1 Tie-Point B",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point B1 on Row 1 (Left (A-E)). All 5 pins in Row 1 on this side are electrically connected."
                    },
                    {
                        "id": "pin_C1",
                        "label": "C1",
                        "alias": "Row 1 Tie-Point C",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point C1 on Row 1 (Left (A-E)). All 5 pins in Row 1 on this side are electrically connected."
                    },
                    {
                        "id": "pin_D1",
                        "label": "D1",
                        "alias": "Row 1 Tie-Point D",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point D1 on Row 1 (Left (A-E)). All 5 pins in Row 1 on this side are electrically connected."
                    },
                    {
                        "id": "pin_E1",
                        "label": "E1",
                        "alias": "Row 1 Tie-Point E",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point E1 on Row 1 (Left (A-E)). All 5 pins in Row 1 on this side are electrically connected."
                    },
                    {
                        "id": "pin_F1",
                        "label": "F1",
                        "alias": "Row 1 Tie-Point F",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point F1 on Row 1 (Right (F-J)). All 5 pins in Row 1 on this side are electrically connected."
                    },
                    {
                        "id": "pin_G1",
                        "label": "G1",
                        "alias": "Row 1 Tie-Point G",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point G1 on Row 1 (Right (F-J)). All 5 pins in Row 1 on this side are electrically connected."
                    },
                    {
                        "id": "pin_H1",
                        "label": "H1",
                        "alias": "Row 1 Tie-Point H",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point H1 on Row 1 (Right (F-J)). All 5 pins in Row 1 on this side are electrically connected."
                    },
                    {
                        "id": "pin_I1",
                        "label": "I1",
                        "alias": "Row 1 Tie-Point I",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point I1 on Row 1 (Right (F-J)). All 5 pins in Row 1 on this side are electrically connected."
                    },
                    {
                        "id": "pin_J1",
                        "label": "J1",
                        "alias": "Row 1 Tie-Point J",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point J1 on Row 1 (Right (F-J)). All 5 pins in Row 1 on this side are electrically connected."
                    },
                    {
                        "id": "pin_A2",
                        "label": "A2",
                        "alias": "Row 2 Tie-Point A",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point A2 on Row 2 (Left (A-E)). All 5 pins in Row 2 on this side are electrically connected."
                    },
                    {
                        "id": "pin_B2",
                        "label": "B2",
                        "alias": "Row 2 Tie-Point B",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point B2 on Row 2 (Left (A-E)). All 5 pins in Row 2 on this side are electrically connected."
                    },
                    {
                        "id": "pin_C2",
                        "label": "C2",
                        "alias": "Row 2 Tie-Point C",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point C2 on Row 2 (Left (A-E)). All 5 pins in Row 2 on this side are electrically connected."
                    },
                    {
                        "id": "pin_D2",
                        "label": "D2",
                        "alias": "Row 2 Tie-Point D",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point D2 on Row 2 (Left (A-E)). All 5 pins in Row 2 on this side are electrically connected."
                    },
                    {
                        "id": "pin_E2",
                        "label": "E2",
                        "alias": "Row 2 Tie-Point E",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point E2 on Row 2 (Left (A-E)). All 5 pins in Row 2 on this side are electrically connected."
                    },
                    {
                        "id": "pin_F2",
                        "label": "F2",
                        "alias": "Row 2 Tie-Point F",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point F2 on Row 2 (Right (F-J)). All 5 pins in Row 2 on this side are electrically connected."
                    },
                    {
                        "id": "pin_G2",
                        "label": "G2",
                        "alias": "Row 2 Tie-Point G",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point G2 on Row 2 (Right (F-J)). All 5 pins in Row 2 on this side are electrically connected."
                    },
                    {
                        "id": "pin_H2",
                        "label": "H2",
                        "alias": "Row 2 Tie-Point H",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point H2 on Row 2 (Right (F-J)). All 5 pins in Row 2 on this side are electrically connected."
                    },
                    {
                        "id": "pin_I2",
                        "label": "I2",
                        "alias": "Row 2 Tie-Point I",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point I2 on Row 2 (Right (F-J)). All 5 pins in Row 2 on this side are electrically connected."
                    },
                    {
                        "id": "pin_J2",
                        "label": "J2",
                        "alias": "Row 2 Tie-Point J",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point J2 on Row 2 (Right (F-J)). All 5 pins in Row 2 on this side are electrically connected."
                    },
                    {
                        "id": "pin_A3",
                        "label": "A3",
                        "alias": "Row 3 Tie-Point A",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point A3 on Row 3 (Left (A-E)). All 5 pins in Row 3 on this side are electrically connected."
                    },
                    {
                        "id": "pin_B3",
                        "label": "B3",
                        "alias": "Row 3 Tie-Point B",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point B3 on Row 3 (Left (A-E)). All 5 pins in Row 3 on this side are electrically connected."
                    },
                    {
                        "id": "pin_C3",
                        "label": "C3",
                        "alias": "Row 3 Tie-Point C",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point C3 on Row 3 (Left (A-E)). All 5 pins in Row 3 on this side are electrically connected."
                    },
                    {
                        "id": "pin_D3",
                        "label": "D3",
                        "alias": "Row 3 Tie-Point D",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point D3 on Row 3 (Left (A-E)). All 5 pins in Row 3 on this side are electrically connected."
                    },
                    {
                        "id": "pin_E3",
                        "label": "E3",
                        "alias": "Row 3 Tie-Point E",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point E3 on Row 3 (Left (A-E)). All 5 pins in Row 3 on this side are electrically connected."
                    },
                    {
                        "id": "pin_F3",
                        "label": "F3",
                        "alias": "Row 3 Tie-Point F",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point F3 on Row 3 (Right (F-J)). All 5 pins in Row 3 on this side are electrically connected."
                    },
                    {
                        "id": "pin_G3",
                        "label": "G3",
                        "alias": "Row 3 Tie-Point G",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point G3 on Row 3 (Right (F-J)). All 5 pins in Row 3 on this side are electrically connected."
                    },
                    {
                        "id": "pin_H3",
                        "label": "H3",
                        "alias": "Row 3 Tie-Point H",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point H3 on Row 3 (Right (F-J)). All 5 pins in Row 3 on this side are electrically connected."
                    },
                    {
                        "id": "pin_I3",
                        "label": "I3",
                        "alias": "Row 3 Tie-Point I",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point I3 on Row 3 (Right (F-J)). All 5 pins in Row 3 on this side are electrically connected."
                    },
                    {
                        "id": "pin_J3",
                        "label": "J3",
                        "alias": "Row 3 Tie-Point J",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point J3 on Row 3 (Right (F-J)). All 5 pins in Row 3 on this side are electrically connected."
                    },
                    {
                        "id": "pin_A4",
                        "label": "A4",
                        "alias": "Row 4 Tie-Point A",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point A4 on Row 4 (Left (A-E)). All 5 pins in Row 4 on this side are electrically connected."
                    },
                    {
                        "id": "pin_B4",
                        "label": "B4",
                        "alias": "Row 4 Tie-Point B",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point B4 on Row 4 (Left (A-E)). All 5 pins in Row 4 on this side are electrically connected."
                    },
                    {
                        "id": "pin_C4",
                        "label": "C4",
                        "alias": "Row 4 Tie-Point C",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point C4 on Row 4 (Left (A-E)). All 5 pins in Row 4 on this side are electrically connected."
                    },
                    {
                        "id": "pin_D4",
                        "label": "D4",
                        "alias": "Row 4 Tie-Point D",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point D4 on Row 4 (Left (A-E)). All 5 pins in Row 4 on this side are electrically connected."
                    },
                    {
                        "id": "pin_E4",
                        "label": "E4",
                        "alias": "Row 4 Tie-Point E",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point E4 on Row 4 (Left (A-E)). All 5 pins in Row 4 on this side are electrically connected."
                    },
                    {
                        "id": "pin_F4",
                        "label": "F4",
                        "alias": "Row 4 Tie-Point F",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point F4 on Row 4 (Right (F-J)). All 5 pins in Row 4 on this side are electrically connected."
                    },
                    {
                        "id": "pin_G4",
                        "label": "G4",
                        "alias": "Row 4 Tie-Point G",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point G4 on Row 4 (Right (F-J)). All 5 pins in Row 4 on this side are electrically connected."
                    },
                    {
                        "id": "pin_H4",
                        "label": "H4",
                        "alias": "Row 4 Tie-Point H",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point H4 on Row 4 (Right (F-J)). All 5 pins in Row 4 on this side are electrically connected."
                    },
                    {
                        "id": "pin_I4",
                        "label": "I4",
                        "alias": "Row 4 Tie-Point I",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point I4 on Row 4 (Right (F-J)). All 5 pins in Row 4 on this side are electrically connected."
                    },
                    {
                        "id": "pin_J4",
                        "label": "J4",
                        "alias": "Row 4 Tie-Point J",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point J4 on Row 4 (Right (F-J)). All 5 pins in Row 4 on this side are electrically connected."
                    },
                    {
                        "id": "pin_A5",
                        "label": "A5",
                        "alias": "Row 5 Tie-Point A",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point A5 on Row 5 (Left (A-E)). All 5 pins in Row 5 on this side are electrically connected."
                    },
                    {
                        "id": "pin_B5",
                        "label": "B5",
                        "alias": "Row 5 Tie-Point B",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point B5 on Row 5 (Left (A-E)). All 5 pins in Row 5 on this side are electrically connected."
                    },
                    {
                        "id": "pin_C5",
                        "label": "C5",
                        "alias": "Row 5 Tie-Point C",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point C5 on Row 5 (Left (A-E)). All 5 pins in Row 5 on this side are electrically connected."
                    },
                    {
                        "id": "pin_D5",
                        "label": "D5",
                        "alias": "Row 5 Tie-Point D",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point D5 on Row 5 (Left (A-E)). All 5 pins in Row 5 on this side are electrically connected."
                    },
                    {
                        "id": "pin_E5",
                        "label": "E5",
                        "alias": "Row 5 Tie-Point E",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point E5 on Row 5 (Left (A-E)). All 5 pins in Row 5 on this side are electrically connected."
                    },
                    {
                        "id": "pin_F5",
                        "label": "F5",
                        "alias": "Row 5 Tie-Point F",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point F5 on Row 5 (Right (F-J)). All 5 pins in Row 5 on this side are electrically connected."
                    },
                    {
                        "id": "pin_G5",
                        "label": "G5",
                        "alias": "Row 5 Tie-Point G",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point G5 on Row 5 (Right (F-J)). All 5 pins in Row 5 on this side are electrically connected."
                    },
                    {
                        "id": "pin_H5",
                        "label": "H5",
                        "alias": "Row 5 Tie-Point H",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point H5 on Row 5 (Right (F-J)). All 5 pins in Row 5 on this side are electrically connected."
                    },
                    {
                        "id": "pin_I5",
                        "label": "I5",
                        "alias": "Row 5 Tie-Point I",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point I5 on Row 5 (Right (F-J)). All 5 pins in Row 5 on this side are electrically connected."
                    },
                    {
                        "id": "pin_J5",
                        "label": "J5",
                        "alias": "Row 5 Tie-Point J",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point J5 on Row 5 (Right (F-J)). All 5 pins in Row 5 on this side are electrically connected."
                    },
                    {
                        "id": "pin_A6",
                        "label": "A6",
                        "alias": "Row 6 Tie-Point A",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point A6 on Row 6 (Left (A-E)). All 5 pins in Row 6 on this side are electrically connected."
                    },
                    {
                        "id": "pin_B6",
                        "label": "B6",
                        "alias": "Row 6 Tie-Point B",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point B6 on Row 6 (Left (A-E)). All 5 pins in Row 6 on this side are electrically connected."
                    },
                    {
                        "id": "pin_C6",
                        "label": "C6",
                        "alias": "Row 6 Tie-Point C",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point C6 on Row 6 (Left (A-E)). All 5 pins in Row 6 on this side are electrically connected."
                    },
                    {
                        "id": "pin_D6",
                        "label": "D6",
                        "alias": "Row 6 Tie-Point D",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point D6 on Row 6 (Left (A-E)). All 5 pins in Row 6 on this side are electrically connected."
                    },
                    {
                        "id": "pin_E6",
                        "label": "E6",
                        "alias": "Row 6 Tie-Point E",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point E6 on Row 6 (Left (A-E)). All 5 pins in Row 6 on this side are electrically connected."
                    },
                    {
                        "id": "pin_F6",
                        "label": "F6",
                        "alias": "Row 6 Tie-Point F",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point F6 on Row 6 (Right (F-J)). All 5 pins in Row 6 on this side are electrically connected."
                    },
                    {
                        "id": "pin_G6",
                        "label": "G6",
                        "alias": "Row 6 Tie-Point G",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point G6 on Row 6 (Right (F-J)). All 5 pins in Row 6 on this side are electrically connected."
                    },
                    {
                        "id": "pin_H6",
                        "label": "H6",
                        "alias": "Row 6 Tie-Point H",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point H6 on Row 6 (Right (F-J)). All 5 pins in Row 6 on this side are electrically connected."
                    },
                    {
                        "id": "pin_I6",
                        "label": "I6",
                        "alias": "Row 6 Tie-Point I",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point I6 on Row 6 (Right (F-J)). All 5 pins in Row 6 on this side are electrically connected."
                    },
                    {
                        "id": "pin_J6",
                        "label": "J6",
                        "alias": "Row 6 Tie-Point J",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point J6 on Row 6 (Right (F-J)). All 5 pins in Row 6 on this side are electrically connected."
                    },
                    {
                        "id": "pin_A7",
                        "label": "A7",
                        "alias": "Row 7 Tie-Point A",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point A7 on Row 7 (Left (A-E)). All 5 pins in Row 7 on this side are electrically connected."
                    },
                    {
                        "id": "pin_B7",
                        "label": "B7",
                        "alias": "Row 7 Tie-Point B",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point B7 on Row 7 (Left (A-E)). All 5 pins in Row 7 on this side are electrically connected."
                    },
                    {
                        "id": "pin_C7",
                        "label": "C7",
                        "alias": "Row 7 Tie-Point C",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point C7 on Row 7 (Left (A-E)). All 5 pins in Row 7 on this side are electrically connected."
                    },
                    {
                        "id": "pin_D7",
                        "label": "D7",
                        "alias": "Row 7 Tie-Point D",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point D7 on Row 7 (Left (A-E)). All 5 pins in Row 7 on this side are electrically connected."
                    },
                    {
                        "id": "pin_E7",
                        "label": "E7",
                        "alias": "Row 7 Tie-Point E",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point E7 on Row 7 (Left (A-E)). All 5 pins in Row 7 on this side are electrically connected."
                    },
                    {
                        "id": "pin_F7",
                        "label": "F7",
                        "alias": "Row 7 Tie-Point F",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point F7 on Row 7 (Right (F-J)). All 5 pins in Row 7 on this side are electrically connected."
                    },
                    {
                        "id": "pin_G7",
                        "label": "G7",
                        "alias": "Row 7 Tie-Point G",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point G7 on Row 7 (Right (F-J)). All 5 pins in Row 7 on this side are electrically connected."
                    },
                    {
                        "id": "pin_H7",
                        "label": "H7",
                        "alias": "Row 7 Tie-Point H",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point H7 on Row 7 (Right (F-J)). All 5 pins in Row 7 on this side are electrically connected."
                    },
                    {
                        "id": "pin_I7",
                        "label": "I7",
                        "alias": "Row 7 Tie-Point I",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point I7 on Row 7 (Right (F-J)). All 5 pins in Row 7 on this side are electrically connected."
                    },
                    {
                        "id": "pin_J7",
                        "label": "J7",
                        "alias": "Row 7 Tie-Point J",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point J7 on Row 7 (Right (F-J)). All 5 pins in Row 7 on this side are electrically connected."
                    },
                    {
                        "id": "pin_A8",
                        "label": "A8",
                        "alias": "Row 8 Tie-Point A",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point A8 on Row 8 (Left (A-E)). All 5 pins in Row 8 on this side are electrically connected."
                    },
                    {
                        "id": "pin_B8",
                        "label": "B8",
                        "alias": "Row 8 Tie-Point B",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point B8 on Row 8 (Left (A-E)). All 5 pins in Row 8 on this side are electrically connected."
                    },
                    {
                        "id": "pin_C8",
                        "label": "C8",
                        "alias": "Row 8 Tie-Point C",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point C8 on Row 8 (Left (A-E)). All 5 pins in Row 8 on this side are electrically connected."
                    },
                    {
                        "id": "pin_D8",
                        "label": "D8",
                        "alias": "Row 8 Tie-Point D",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point D8 on Row 8 (Left (A-E)). All 5 pins in Row 8 on this side are electrically connected."
                    },
                    {
                        "id": "pin_E8",
                        "label": "E8",
                        "alias": "Row 8 Tie-Point E",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point E8 on Row 8 (Left (A-E)). All 5 pins in Row 8 on this side are electrically connected."
                    },
                    {
                        "id": "pin_F8",
                        "label": "F8",
                        "alias": "Row 8 Tie-Point F",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point F8 on Row 8 (Right (F-J)). All 5 pins in Row 8 on this side are electrically connected."
                    },
                    {
                        "id": "pin_G8",
                        "label": "G8",
                        "alias": "Row 8 Tie-Point G",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point G8 on Row 8 (Right (F-J)). All 5 pins in Row 8 on this side are electrically connected."
                    },
                    {
                        "id": "pin_H8",
                        "label": "H8",
                        "alias": "Row 8 Tie-Point H",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point H8 on Row 8 (Right (F-J)). All 5 pins in Row 8 on this side are electrically connected."
                    },
                    {
                        "id": "pin_I8",
                        "label": "I8",
                        "alias": "Row 8 Tie-Point I",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point I8 on Row 8 (Right (F-J)). All 5 pins in Row 8 on this side are electrically connected."
                    },
                    {
                        "id": "pin_J8",
                        "label": "J8",
                        "alias": "Row 8 Tie-Point J",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point J8 on Row 8 (Right (F-J)). All 5 pins in Row 8 on this side are electrically connected."
                    },
                    {
                        "id": "pin_A9",
                        "label": "A9",
                        "alias": "Row 9 Tie-Point A",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point A9 on Row 9 (Left (A-E)). All 5 pins in Row 9 on this side are electrically connected."
                    },
                    {
                        "id": "pin_B9",
                        "label": "B9",
                        "alias": "Row 9 Tie-Point B",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point B9 on Row 9 (Left (A-E)). All 5 pins in Row 9 on this side are electrically connected."
                    },
                    {
                        "id": "pin_C9",
                        "label": "C9",
                        "alias": "Row 9 Tie-Point C",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point C9 on Row 9 (Left (A-E)). All 5 pins in Row 9 on this side are electrically connected."
                    },
                    {
                        "id": "pin_D9",
                        "label": "D9",
                        "alias": "Row 9 Tie-Point D",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point D9 on Row 9 (Left (A-E)). All 5 pins in Row 9 on this side are electrically connected."
                    },
                    {
                        "id": "pin_E9",
                        "label": "E9",
                        "alias": "Row 9 Tie-Point E",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point E9 on Row 9 (Left (A-E)). All 5 pins in Row 9 on this side are electrically connected."
                    },
                    {
                        "id": "pin_F9",
                        "label": "F9",
                        "alias": "Row 9 Tie-Point F",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point F9 on Row 9 (Right (F-J)). All 5 pins in Row 9 on this side are electrically connected."
                    },
                    {
                        "id": "pin_G9",
                        "label": "G9",
                        "alias": "Row 9 Tie-Point G",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point G9 on Row 9 (Right (F-J)). All 5 pins in Row 9 on this side are electrically connected."
                    },
                    {
                        "id": "pin_H9",
                        "label": "H9",
                        "alias": "Row 9 Tie-Point H",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point H9 on Row 9 (Right (F-J)). All 5 pins in Row 9 on this side are electrically connected."
                    },
                    {
                        "id": "pin_I9",
                        "label": "I9",
                        "alias": "Row 9 Tie-Point I",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point I9 on Row 9 (Right (F-J)). All 5 pins in Row 9 on this side are electrically connected."
                    },
                    {
                        "id": "pin_J9",
                        "label": "J9",
                        "alias": "Row 9 Tie-Point J",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point J9 on Row 9 (Right (F-J)). All 5 pins in Row 9 on this side are electrically connected."
                    },
                    {
                        "id": "pin_A10",
                        "label": "A10",
                        "alias": "Row 10 Tie-Point A",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point A10 on Row 10 (Left (A-E)). All 5 pins in Row 10 on this side are electrically connected."
                    },
                    {
                        "id": "pin_B10",
                        "label": "B10",
                        "alias": "Row 10 Tie-Point B",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point B10 on Row 10 (Left (A-E)). All 5 pins in Row 10 on this side are electrically connected."
                    },
                    {
                        "id": "pin_C10",
                        "label": "C10",
                        "alias": "Row 10 Tie-Point C",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point C10 on Row 10 (Left (A-E)). All 5 pins in Row 10 on this side are electrically connected."
                    },
                    {
                        "id": "pin_D10",
                        "label": "D10",
                        "alias": "Row 10 Tie-Point D",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point D10 on Row 10 (Left (A-E)). All 5 pins in Row 10 on this side are electrically connected."
                    },
                    {
                        "id": "pin_E10",
                        "label": "E10",
                        "alias": "Row 10 Tie-Point E",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point E10 on Row 10 (Left (A-E)). All 5 pins in Row 10 on this side are electrically connected."
                    },
                    {
                        "id": "pin_F10",
                        "label": "F10",
                        "alias": "Row 10 Tie-Point F",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point F10 on Row 10 (Right (F-J)). All 5 pins in Row 10 on this side are electrically connected."
                    },
                    {
                        "id": "pin_G10",
                        "label": "G10",
                        "alias": "Row 10 Tie-Point G",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point G10 on Row 10 (Right (F-J)). All 5 pins in Row 10 on this side are electrically connected."
                    },
                    {
                        "id": "pin_H10",
                        "label": "H10",
                        "alias": "Row 10 Tie-Point H",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point H10 on Row 10 (Right (F-J)). All 5 pins in Row 10 on this side are electrically connected."
                    },
                    {
                        "id": "pin_I10",
                        "label": "I10",
                        "alias": "Row 10 Tie-Point I",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point I10 on Row 10 (Right (F-J)). All 5 pins in Row 10 on this side are electrically connected."
                    },
                    {
                        "id": "pin_J10",
                        "label": "J10",
                        "alias": "Row 10 Tie-Point J",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point J10 on Row 10 (Right (F-J)). All 5 pins in Row 10 on this side are electrically connected."
                    },
                    {
                        "id": "pin_A11",
                        "label": "A11",
                        "alias": "Row 11 Tie-Point A",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point A11 on Row 11 (Left (A-E)). All 5 pins in Row 11 on this side are electrically connected."
                    },
                    {
                        "id": "pin_B11",
                        "label": "B11",
                        "alias": "Row 11 Tie-Point B",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point B11 on Row 11 (Left (A-E)). All 5 pins in Row 11 on this side are electrically connected."
                    },
                    {
                        "id": "pin_C11",
                        "label": "C11",
                        "alias": "Row 11 Tie-Point C",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point C11 on Row 11 (Left (A-E)). All 5 pins in Row 11 on this side are electrically connected."
                    },
                    {
                        "id": "pin_D11",
                        "label": "D11",
                        "alias": "Row 11 Tie-Point D",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point D11 on Row 11 (Left (A-E)). All 5 pins in Row 11 on this side are electrically connected."
                    },
                    {
                        "id": "pin_E11",
                        "label": "E11",
                        "alias": "Row 11 Tie-Point E",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point E11 on Row 11 (Left (A-E)). All 5 pins in Row 11 on this side are electrically connected."
                    },
                    {
                        "id": "pin_F11",
                        "label": "F11",
                        "alias": "Row 11 Tie-Point F",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point F11 on Row 11 (Right (F-J)). All 5 pins in Row 11 on this side are electrically connected."
                    },
                    {
                        "id": "pin_G11",
                        "label": "G11",
                        "alias": "Row 11 Tie-Point G",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point G11 on Row 11 (Right (F-J)). All 5 pins in Row 11 on this side are electrically connected."
                    },
                    {
                        "id": "pin_H11",
                        "label": "H11",
                        "alias": "Row 11 Tie-Point H",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point H11 on Row 11 (Right (F-J)). All 5 pins in Row 11 on this side are electrically connected."
                    },
                    {
                        "id": "pin_I11",
                        "label": "I11",
                        "alias": "Row 11 Tie-Point I",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point I11 on Row 11 (Right (F-J)). All 5 pins in Row 11 on this side are electrically connected."
                    },
                    {
                        "id": "pin_J11",
                        "label": "J11",
                        "alias": "Row 11 Tie-Point J",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point J11 on Row 11 (Right (F-J)). All 5 pins in Row 11 on this side are electrically connected."
                    },
                    {
                        "id": "pin_A12",
                        "label": "A12",
                        "alias": "Row 12 Tie-Point A",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point A12 on Row 12 (Left (A-E)). All 5 pins in Row 12 on this side are electrically connected."
                    },
                    {
                        "id": "pin_B12",
                        "label": "B12",
                        "alias": "Row 12 Tie-Point B",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point B12 on Row 12 (Left (A-E)). All 5 pins in Row 12 on this side are electrically connected."
                    },
                    {
                        "id": "pin_C12",
                        "label": "C12",
                        "alias": "Row 12 Tie-Point C",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point C12 on Row 12 (Left (A-E)). All 5 pins in Row 12 on this side are electrically connected."
                    },
                    {
                        "id": "pin_D12",
                        "label": "D12",
                        "alias": "Row 12 Tie-Point D",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point D12 on Row 12 (Left (A-E)). All 5 pins in Row 12 on this side are electrically connected."
                    },
                    {
                        "id": "pin_E12",
                        "label": "E12",
                        "alias": "Row 12 Tie-Point E",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point E12 on Row 12 (Left (A-E)). All 5 pins in Row 12 on this side are electrically connected."
                    },
                    {
                        "id": "pin_F12",
                        "label": "F12",
                        "alias": "Row 12 Tie-Point F",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point F12 on Row 12 (Right (F-J)). All 5 pins in Row 12 on this side are electrically connected."
                    },
                    {
                        "id": "pin_G12",
                        "label": "G12",
                        "alias": "Row 12 Tie-Point G",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point G12 on Row 12 (Right (F-J)). All 5 pins in Row 12 on this side are electrically connected."
                    },
                    {
                        "id": "pin_H12",
                        "label": "H12",
                        "alias": "Row 12 Tie-Point H",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point H12 on Row 12 (Right (F-J)). All 5 pins in Row 12 on this side are electrically connected."
                    },
                    {
                        "id": "pin_I12",
                        "label": "I12",
                        "alias": "Row 12 Tie-Point I",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point I12 on Row 12 (Right (F-J)). All 5 pins in Row 12 on this side are electrically connected."
                    },
                    {
                        "id": "pin_J12",
                        "label": "J12",
                        "alias": "Row 12 Tie-Point J",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point J12 on Row 12 (Right (F-J)). All 5 pins in Row 12 on this side are electrically connected."
                    },
                    {
                        "id": "pin_A13",
                        "label": "A13",
                        "alias": "Row 13 Tie-Point A",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point A13 on Row 13 (Left (A-E)). All 5 pins in Row 13 on this side are electrically connected."
                    },
                    {
                        "id": "pin_B13",
                        "label": "B13",
                        "alias": "Row 13 Tie-Point B",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point B13 on Row 13 (Left (A-E)). All 5 pins in Row 13 on this side are electrically connected."
                    },
                    {
                        "id": "pin_C13",
                        "label": "C13",
                        "alias": "Row 13 Tie-Point C",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point C13 on Row 13 (Left (A-E)). All 5 pins in Row 13 on this side are electrically connected."
                    },
                    {
                        "id": "pin_D13",
                        "label": "D13",
                        "alias": "Row 13 Tie-Point D",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point D13 on Row 13 (Left (A-E)). All 5 pins in Row 13 on this side are electrically connected."
                    },
                    {
                        "id": "pin_E13",
                        "label": "E13",
                        "alias": "Row 13 Tie-Point E",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point E13 on Row 13 (Left (A-E)). All 5 pins in Row 13 on this side are electrically connected."
                    },
                    {
                        "id": "pin_F13",
                        "label": "F13",
                        "alias": "Row 13 Tie-Point F",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point F13 on Row 13 (Right (F-J)). All 5 pins in Row 13 on this side are electrically connected."
                    },
                    {
                        "id": "pin_G13",
                        "label": "G13",
                        "alias": "Row 13 Tie-Point G",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point G13 on Row 13 (Right (F-J)). All 5 pins in Row 13 on this side are electrically connected."
                    },
                    {
                        "id": "pin_H13",
                        "label": "H13",
                        "alias": "Row 13 Tie-Point H",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point H13 on Row 13 (Right (F-J)). All 5 pins in Row 13 on this side are electrically connected."
                    },
                    {
                        "id": "pin_I13",
                        "label": "I13",
                        "alias": "Row 13 Tie-Point I",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point I13 on Row 13 (Right (F-J)). All 5 pins in Row 13 on this side are electrically connected."
                    },
                    {
                        "id": "pin_J13",
                        "label": "J13",
                        "alias": "Row 13 Tie-Point J",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point J13 on Row 13 (Right (F-J)). All 5 pins in Row 13 on this side are electrically connected."
                    },
                    {
                        "id": "pin_A14",
                        "label": "A14",
                        "alias": "Row 14 Tie-Point A",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point A14 on Row 14 (Left (A-E)). All 5 pins in Row 14 on this side are electrically connected."
                    },
                    {
                        "id": "pin_B14",
                        "label": "B14",
                        "alias": "Row 14 Tie-Point B",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point B14 on Row 14 (Left (A-E)). All 5 pins in Row 14 on this side are electrically connected."
                    },
                    {
                        "id": "pin_C14",
                        "label": "C14",
                        "alias": "Row 14 Tie-Point C",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point C14 on Row 14 (Left (A-E)). All 5 pins in Row 14 on this side are electrically connected."
                    },
                    {
                        "id": "pin_D14",
                        "label": "D14",
                        "alias": "Row 14 Tie-Point D",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point D14 on Row 14 (Left (A-E)). All 5 pins in Row 14 on this side are electrically connected."
                    },
                    {
                        "id": "pin_E14",
                        "label": "E14",
                        "alias": "Row 14 Tie-Point E",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point E14 on Row 14 (Left (A-E)). All 5 pins in Row 14 on this side are electrically connected."
                    },
                    {
                        "id": "pin_F14",
                        "label": "F14",
                        "alias": "Row 14 Tie-Point F",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point F14 on Row 14 (Right (F-J)). All 5 pins in Row 14 on this side are electrically connected."
                    },
                    {
                        "id": "pin_G14",
                        "label": "G14",
                        "alias": "Row 14 Tie-Point G",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point G14 on Row 14 (Right (F-J)). All 5 pins in Row 14 on this side are electrically connected."
                    },
                    {
                        "id": "pin_H14",
                        "label": "H14",
                        "alias": "Row 14 Tie-Point H",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point H14 on Row 14 (Right (F-J)). All 5 pins in Row 14 on this side are electrically connected."
                    },
                    {
                        "id": "pin_I14",
                        "label": "I14",
                        "alias": "Row 14 Tie-Point I",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point I14 on Row 14 (Right (F-J)). All 5 pins in Row 14 on this side are electrically connected."
                    },
                    {
                        "id": "pin_J14",
                        "label": "J14",
                        "alias": "Row 14 Tie-Point J",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point J14 on Row 14 (Right (F-J)). All 5 pins in Row 14 on this side are electrically connected."
                    },
                    {
                        "id": "pin_A15",
                        "label": "A15",
                        "alias": "Row 15 Tie-Point A",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point A15 on Row 15 (Left (A-E)). All 5 pins in Row 15 on this side are electrically connected."
                    },
                    {
                        "id": "pin_B15",
                        "label": "B15",
                        "alias": "Row 15 Tie-Point B",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point B15 on Row 15 (Left (A-E)). All 5 pins in Row 15 on this side are electrically connected."
                    },
                    {
                        "id": "pin_C15",
                        "label": "C15",
                        "alias": "Row 15 Tie-Point C",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point C15 on Row 15 (Left (A-E)). All 5 pins in Row 15 on this side are electrically connected."
                    },
                    {
                        "id": "pin_D15",
                        "label": "D15",
                        "alias": "Row 15 Tie-Point D",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point D15 on Row 15 (Left (A-E)). All 5 pins in Row 15 on this side are electrically connected."
                    },
                    {
                        "id": "pin_E15",
                        "label": "E15",
                        "alias": "Row 15 Tie-Point E",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point E15 on Row 15 (Left (A-E)). All 5 pins in Row 15 on this side are electrically connected."
                    },
                    {
                        "id": "pin_F15",
                        "label": "F15",
                        "alias": "Row 15 Tie-Point F",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point F15 on Row 15 (Right (F-J)). All 5 pins in Row 15 on this side are electrically connected."
                    },
                    {
                        "id": "pin_G15",
                        "label": "G15",
                        "alias": "Row 15 Tie-Point G",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point G15 on Row 15 (Right (F-J)). All 5 pins in Row 15 on this side are electrically connected."
                    },
                    {
                        "id": "pin_H15",
                        "label": "H15",
                        "alias": "Row 15 Tie-Point H",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point H15 on Row 15 (Right (F-J)). All 5 pins in Row 15 on this side are electrically connected."
                    },
                    {
                        "id": "pin_I15",
                        "label": "I15",
                        "alias": "Row 15 Tie-Point I",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point I15 on Row 15 (Right (F-J)). All 5 pins in Row 15 on this side are electrically connected."
                    },
                    {
                        "id": "pin_J15",
                        "label": "J15",
                        "alias": "Row 15 Tie-Point J",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point J15 on Row 15 (Right (F-J)). All 5 pins in Row 15 on this side are electrically connected."
                    },
                    {
                        "id": "pin_A16",
                        "label": "A16",
                        "alias": "Row 16 Tie-Point A",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point A16 on Row 16 (Left (A-E)). All 5 pins in Row 16 on this side are electrically connected."
                    },
                    {
                        "id": "pin_B16",
                        "label": "B16",
                        "alias": "Row 16 Tie-Point B",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point B16 on Row 16 (Left (A-E)). All 5 pins in Row 16 on this side are electrically connected."
                    },
                    {
                        "id": "pin_C16",
                        "label": "C16",
                        "alias": "Row 16 Tie-Point C",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point C16 on Row 16 (Left (A-E)). All 5 pins in Row 16 on this side are electrically connected."
                    },
                    {
                        "id": "pin_D16",
                        "label": "D16",
                        "alias": "Row 16 Tie-Point D",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point D16 on Row 16 (Left (A-E)). All 5 pins in Row 16 on this side are electrically connected."
                    },
                    {
                        "id": "pin_E16",
                        "label": "E16",
                        "alias": "Row 16 Tie-Point E",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point E16 on Row 16 (Left (A-E)). All 5 pins in Row 16 on this side are electrically connected."
                    },
                    {
                        "id": "pin_F16",
                        "label": "F16",
                        "alias": "Row 16 Tie-Point F",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point F16 on Row 16 (Right (F-J)). All 5 pins in Row 16 on this side are electrically connected."
                    },
                    {
                        "id": "pin_G16",
                        "label": "G16",
                        "alias": "Row 16 Tie-Point G",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point G16 on Row 16 (Right (F-J)). All 5 pins in Row 16 on this side are electrically connected."
                    },
                    {
                        "id": "pin_H16",
                        "label": "H16",
                        "alias": "Row 16 Tie-Point H",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point H16 on Row 16 (Right (F-J)). All 5 pins in Row 16 on this side are electrically connected."
                    },
                    {
                        "id": "pin_I16",
                        "label": "I16",
                        "alias": "Row 16 Tie-Point I",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point I16 on Row 16 (Right (F-J)). All 5 pins in Row 16 on this side are electrically connected."
                    },
                    {
                        "id": "pin_J16",
                        "label": "J16",
                        "alias": "Row 16 Tie-Point J",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point J16 on Row 16 (Right (F-J)). All 5 pins in Row 16 on this side are electrically connected."
                    },
                    {
                        "id": "pin_A17",
                        "label": "A17",
                        "alias": "Row 17 Tie-Point A",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point A17 on Row 17 (Left (A-E)). All 5 pins in Row 17 on this side are electrically connected."
                    },
                    {
                        "id": "pin_B17",
                        "label": "B17",
                        "alias": "Row 17 Tie-Point B",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point B17 on Row 17 (Left (A-E)). All 5 pins in Row 17 on this side are electrically connected."
                    },
                    {
                        "id": "pin_C17",
                        "label": "C17",
                        "alias": "Row 17 Tie-Point C",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point C17 on Row 17 (Left (A-E)). All 5 pins in Row 17 on this side are electrically connected."
                    },
                    {
                        "id": "pin_D17",
                        "label": "D17",
                        "alias": "Row 17 Tie-Point D",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point D17 on Row 17 (Left (A-E)). All 5 pins in Row 17 on this side are electrically connected."
                    },
                    {
                        "id": "pin_E17",
                        "label": "E17",
                        "alias": "Row 17 Tie-Point E",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point E17 on Row 17 (Left (A-E)). All 5 pins in Row 17 on this side are electrically connected."
                    },
                    {
                        "id": "pin_F17",
                        "label": "F17",
                        "alias": "Row 17 Tie-Point F",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point F17 on Row 17 (Right (F-J)). All 5 pins in Row 17 on this side are electrically connected."
                    },
                    {
                        "id": "pin_G17",
                        "label": "G17",
                        "alias": "Row 17 Tie-Point G",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point G17 on Row 17 (Right (F-J)). All 5 pins in Row 17 on this side are electrically connected."
                    },
                    {
                        "id": "pin_H17",
                        "label": "H17",
                        "alias": "Row 17 Tie-Point H",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point H17 on Row 17 (Right (F-J)). All 5 pins in Row 17 on this side are electrically connected."
                    },
                    {
                        "id": "pin_I17",
                        "label": "I17",
                        "alias": "Row 17 Tie-Point I",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point I17 on Row 17 (Right (F-J)). All 5 pins in Row 17 on this side are electrically connected."
                    },
                    {
                        "id": "pin_J17",
                        "label": "J17",
                        "alias": "Row 17 Tie-Point J",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point J17 on Row 17 (Right (F-J)). All 5 pins in Row 17 on this side are electrically connected."
                    },
                    {
                        "id": "pin_A18",
                        "label": "A18",
                        "alias": "Row 18 Tie-Point A",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point A18 on Row 18 (Left (A-E)). All 5 pins in Row 18 on this side are electrically connected."
                    },
                    {
                        "id": "pin_B18",
                        "label": "B18",
                        "alias": "Row 18 Tie-Point B",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point B18 on Row 18 (Left (A-E)). All 5 pins in Row 18 on this side are electrically connected."
                    },
                    {
                        "id": "pin_C18",
                        "label": "C18",
                        "alias": "Row 18 Tie-Point C",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point C18 on Row 18 (Left (A-E)). All 5 pins in Row 18 on this side are electrically connected."
                    },
                    {
                        "id": "pin_D18",
                        "label": "D18",
                        "alias": "Row 18 Tie-Point D",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point D18 on Row 18 (Left (A-E)). All 5 pins in Row 18 on this side are electrically connected."
                    },
                    {
                        "id": "pin_E18",
                        "label": "E18",
                        "alias": "Row 18 Tie-Point E",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point E18 on Row 18 (Left (A-E)). All 5 pins in Row 18 on this side are electrically connected."
                    },
                    {
                        "id": "pin_F18",
                        "label": "F18",
                        "alias": "Row 18 Tie-Point F",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point F18 on Row 18 (Right (F-J)). All 5 pins in Row 18 on this side are electrically connected."
                    },
                    {
                        "id": "pin_G18",
                        "label": "G18",
                        "alias": "Row 18 Tie-Point G",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point G18 on Row 18 (Right (F-J)). All 5 pins in Row 18 on this side are electrically connected."
                    },
                    {
                        "id": "pin_H18",
                        "label": "H18",
                        "alias": "Row 18 Tie-Point H",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point H18 on Row 18 (Right (F-J)). All 5 pins in Row 18 on this side are electrically connected."
                    },
                    {
                        "id": "pin_I18",
                        "label": "I18",
                        "alias": "Row 18 Tie-Point I",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point I18 on Row 18 (Right (F-J)). All 5 pins in Row 18 on this side are electrically connected."
                    },
                    {
                        "id": "pin_J18",
                        "label": "J18",
                        "alias": "Row 18 Tie-Point J",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point J18 on Row 18 (Right (F-J)). All 5 pins in Row 18 on this side are electrically connected."
                    },
                    {
                        "id": "pin_A19",
                        "label": "A19",
                        "alias": "Row 19 Tie-Point A",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point A19 on Row 19 (Left (A-E)). All 5 pins in Row 19 on this side are electrically connected."
                    },
                    {
                        "id": "pin_B19",
                        "label": "B19",
                        "alias": "Row 19 Tie-Point B",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point B19 on Row 19 (Left (A-E)). All 5 pins in Row 19 on this side are electrically connected."
                    },
                    {
                        "id": "pin_C19",
                        "label": "C19",
                        "alias": "Row 19 Tie-Point C",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point C19 on Row 19 (Left (A-E)). All 5 pins in Row 19 on this side are electrically connected."
                    },
                    {
                        "id": "pin_D19",
                        "label": "D19",
                        "alias": "Row 19 Tie-Point D",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point D19 on Row 19 (Left (A-E)). All 5 pins in Row 19 on this side are electrically connected."
                    },
                    {
                        "id": "pin_E19",
                        "label": "E19",
                        "alias": "Row 19 Tie-Point E",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point E19 on Row 19 (Left (A-E)). All 5 pins in Row 19 on this side are electrically connected."
                    },
                    {
                        "id": "pin_F19",
                        "label": "F19",
                        "alias": "Row 19 Tie-Point F",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point F19 on Row 19 (Right (F-J)). All 5 pins in Row 19 on this side are electrically connected."
                    },
                    {
                        "id": "pin_G19",
                        "label": "G19",
                        "alias": "Row 19 Tie-Point G",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point G19 on Row 19 (Right (F-J)). All 5 pins in Row 19 on this side are electrically connected."
                    },
                    {
                        "id": "pin_H19",
                        "label": "H19",
                        "alias": "Row 19 Tie-Point H",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point H19 on Row 19 (Right (F-J)). All 5 pins in Row 19 on this side are electrically connected."
                    },
                    {
                        "id": "pin_I19",
                        "label": "I19",
                        "alias": "Row 19 Tie-Point I",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point I19 on Row 19 (Right (F-J)). All 5 pins in Row 19 on this side are electrically connected."
                    },
                    {
                        "id": "pin_J19",
                        "label": "J19",
                        "alias": "Row 19 Tie-Point J",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point J19 on Row 19 (Right (F-J)). All 5 pins in Row 19 on this side are electrically connected."
                    },
                    {
                        "id": "pin_A20",
                        "label": "A20",
                        "alias": "Row 20 Tie-Point A",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point A20 on Row 20 (Left (A-E)). All 5 pins in Row 20 on this side are electrically connected."
                    },
                    {
                        "id": "pin_B20",
                        "label": "B20",
                        "alias": "Row 20 Tie-Point B",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point B20 on Row 20 (Left (A-E)). All 5 pins in Row 20 on this side are electrically connected."
                    },
                    {
                        "id": "pin_C20",
                        "label": "C20",
                        "alias": "Row 20 Tie-Point C",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point C20 on Row 20 (Left (A-E)). All 5 pins in Row 20 on this side are electrically connected."
                    },
                    {
                        "id": "pin_D20",
                        "label": "D20",
                        "alias": "Row 20 Tie-Point D",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point D20 on Row 20 (Left (A-E)). All 5 pins in Row 20 on this side are electrically connected."
                    },
                    {
                        "id": "pin_E20",
                        "label": "E20",
                        "alias": "Row 20 Tie-Point E",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point E20 on Row 20 (Left (A-E)). All 5 pins in Row 20 on this side are electrically connected."
                    },
                    {
                        "id": "pin_F20",
                        "label": "F20",
                        "alias": "Row 20 Tie-Point F",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point F20 on Row 20 (Right (F-J)). All 5 pins in Row 20 on this side are electrically connected."
                    },
                    {
                        "id": "pin_G20",
                        "label": "G20",
                        "alias": "Row 20 Tie-Point G",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point G20 on Row 20 (Right (F-J)). All 5 pins in Row 20 on this side are electrically connected."
                    },
                    {
                        "id": "pin_H20",
                        "label": "H20",
                        "alias": "Row 20 Tie-Point H",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point H20 on Row 20 (Right (F-J)). All 5 pins in Row 20 on this side are electrically connected."
                    },
                    {
                        "id": "pin_I20",
                        "label": "I20",
                        "alias": "Row 20 Tie-Point I",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point I20 on Row 20 (Right (F-J)). All 5 pins in Row 20 on this side are electrically connected."
                    },
                    {
                        "id": "pin_J20",
                        "label": "J20",
                        "alias": "Row 20 Tie-Point J",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point J20 on Row 20 (Right (F-J)). All 5 pins in Row 20 on this side are electrically connected."
                    },
                    {
                        "id": "pin_A21",
                        "label": "A21",
                        "alias": "Row 21 Tie-Point A",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point A21 on Row 21 (Left (A-E)). All 5 pins in Row 21 on this side are electrically connected."
                    },
                    {
                        "id": "pin_B21",
                        "label": "B21",
                        "alias": "Row 21 Tie-Point B",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point B21 on Row 21 (Left (A-E)). All 5 pins in Row 21 on this side are electrically connected."
                    },
                    {
                        "id": "pin_C21",
                        "label": "C21",
                        "alias": "Row 21 Tie-Point C",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point C21 on Row 21 (Left (A-E)). All 5 pins in Row 21 on this side are electrically connected."
                    },
                    {
                        "id": "pin_D21",
                        "label": "D21",
                        "alias": "Row 21 Tie-Point D",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point D21 on Row 21 (Left (A-E)). All 5 pins in Row 21 on this side are electrically connected."
                    },
                    {
                        "id": "pin_E21",
                        "label": "E21",
                        "alias": "Row 21 Tie-Point E",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point E21 on Row 21 (Left (A-E)). All 5 pins in Row 21 on this side are electrically connected."
                    },
                    {
                        "id": "pin_F21",
                        "label": "F21",
                        "alias": "Row 21 Tie-Point F",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point F21 on Row 21 (Right (F-J)). All 5 pins in Row 21 on this side are electrically connected."
                    },
                    {
                        "id": "pin_G21",
                        "label": "G21",
                        "alias": "Row 21 Tie-Point G",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point G21 on Row 21 (Right (F-J)). All 5 pins in Row 21 on this side are electrically connected."
                    },
                    {
                        "id": "pin_H21",
                        "label": "H21",
                        "alias": "Row 21 Tie-Point H",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point H21 on Row 21 (Right (F-J)). All 5 pins in Row 21 on this side are electrically connected."
                    },
                    {
                        "id": "pin_I21",
                        "label": "I21",
                        "alias": "Row 21 Tie-Point I",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point I21 on Row 21 (Right (F-J)). All 5 pins in Row 21 on this side are electrically connected."
                    },
                    {
                        "id": "pin_J21",
                        "label": "J21",
                        "alias": "Row 21 Tie-Point J",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point J21 on Row 21 (Right (F-J)). All 5 pins in Row 21 on this side are electrically connected."
                    },
                    {
                        "id": "pin_A22",
                        "label": "A22",
                        "alias": "Row 22 Tie-Point A",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point A22 on Row 22 (Left (A-E)). All 5 pins in Row 22 on this side are electrically connected."
                    },
                    {
                        "id": "pin_B22",
                        "label": "B22",
                        "alias": "Row 22 Tie-Point B",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point B22 on Row 22 (Left (A-E)). All 5 pins in Row 22 on this side are electrically connected."
                    },
                    {
                        "id": "pin_C22",
                        "label": "C22",
                        "alias": "Row 22 Tie-Point C",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point C22 on Row 22 (Left (A-E)). All 5 pins in Row 22 on this side are electrically connected."
                    },
                    {
                        "id": "pin_D22",
                        "label": "D22",
                        "alias": "Row 22 Tie-Point D",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point D22 on Row 22 (Left (A-E)). All 5 pins in Row 22 on this side are electrically connected."
                    },
                    {
                        "id": "pin_E22",
                        "label": "E22",
                        "alias": "Row 22 Tie-Point E",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point E22 on Row 22 (Left (A-E)). All 5 pins in Row 22 on this side are electrically connected."
                    },
                    {
                        "id": "pin_F22",
                        "label": "F22",
                        "alias": "Row 22 Tie-Point F",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point F22 on Row 22 (Right (F-J)). All 5 pins in Row 22 on this side are electrically connected."
                    },
                    {
                        "id": "pin_G22",
                        "label": "G22",
                        "alias": "Row 22 Tie-Point G",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point G22 on Row 22 (Right (F-J)). All 5 pins in Row 22 on this side are electrically connected."
                    },
                    {
                        "id": "pin_H22",
                        "label": "H22",
                        "alias": "Row 22 Tie-Point H",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point H22 on Row 22 (Right (F-J)). All 5 pins in Row 22 on this side are electrically connected."
                    },
                    {
                        "id": "pin_I22",
                        "label": "I22",
                        "alias": "Row 22 Tie-Point I",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point I22 on Row 22 (Right (F-J)). All 5 pins in Row 22 on this side are electrically connected."
                    },
                    {
                        "id": "pin_J22",
                        "label": "J22",
                        "alias": "Row 22 Tie-Point J",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point J22 on Row 22 (Right (F-J)). All 5 pins in Row 22 on this side are electrically connected."
                    },
                    {
                        "id": "pin_A23",
                        "label": "A23",
                        "alias": "Row 23 Tie-Point A",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point A23 on Row 23 (Left (A-E)). All 5 pins in Row 23 on this side are electrically connected."
                    },
                    {
                        "id": "pin_B23",
                        "label": "B23",
                        "alias": "Row 23 Tie-Point B",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point B23 on Row 23 (Left (A-E)). All 5 pins in Row 23 on this side are electrically connected."
                    },
                    {
                        "id": "pin_C23",
                        "label": "C23",
                        "alias": "Row 23 Tie-Point C",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point C23 on Row 23 (Left (A-E)). All 5 pins in Row 23 on this side are electrically connected."
                    },
                    {
                        "id": "pin_D23",
                        "label": "D23",
                        "alias": "Row 23 Tie-Point D",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point D23 on Row 23 (Left (A-E)). All 5 pins in Row 23 on this side are electrically connected."
                    },
                    {
                        "id": "pin_E23",
                        "label": "E23",
                        "alias": "Row 23 Tie-Point E",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point E23 on Row 23 (Left (A-E)). All 5 pins in Row 23 on this side are electrically connected."
                    },
                    {
                        "id": "pin_F23",
                        "label": "F23",
                        "alias": "Row 23 Tie-Point F",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point F23 on Row 23 (Right (F-J)). All 5 pins in Row 23 on this side are electrically connected."
                    },
                    {
                        "id": "pin_G23",
                        "label": "G23",
                        "alias": "Row 23 Tie-Point G",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point G23 on Row 23 (Right (F-J)). All 5 pins in Row 23 on this side are electrically connected."
                    },
                    {
                        "id": "pin_H23",
                        "label": "H23",
                        "alias": "Row 23 Tie-Point H",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point H23 on Row 23 (Right (F-J)). All 5 pins in Row 23 on this side are electrically connected."
                    },
                    {
                        "id": "pin_I23",
                        "label": "I23",
                        "alias": "Row 23 Tie-Point I",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point I23 on Row 23 (Right (F-J)). All 5 pins in Row 23 on this side are electrically connected."
                    },
                    {
                        "id": "pin_J23",
                        "label": "J23",
                        "alias": "Row 23 Tie-Point J",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point J23 on Row 23 (Right (F-J)). All 5 pins in Row 23 on this side are electrically connected."
                    },
                    {
                        "id": "pin_A24",
                        "label": "A24",
                        "alias": "Row 24 Tie-Point A",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point A24 on Row 24 (Left (A-E)). All 5 pins in Row 24 on this side are electrically connected."
                    },
                    {
                        "id": "pin_B24",
                        "label": "B24",
                        "alias": "Row 24 Tie-Point B",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point B24 on Row 24 (Left (A-E)). All 5 pins in Row 24 on this side are electrically connected."
                    },
                    {
                        "id": "pin_C24",
                        "label": "C24",
                        "alias": "Row 24 Tie-Point C",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point C24 on Row 24 (Left (A-E)). All 5 pins in Row 24 on this side are electrically connected."
                    },
                    {
                        "id": "pin_D24",
                        "label": "D24",
                        "alias": "Row 24 Tie-Point D",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point D24 on Row 24 (Left (A-E)). All 5 pins in Row 24 on this side are electrically connected."
                    },
                    {
                        "id": "pin_E24",
                        "label": "E24",
                        "alias": "Row 24 Tie-Point E",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point E24 on Row 24 (Left (A-E)). All 5 pins in Row 24 on this side are electrically connected."
                    },
                    {
                        "id": "pin_F24",
                        "label": "F24",
                        "alias": "Row 24 Tie-Point F",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point F24 on Row 24 (Right (F-J)). All 5 pins in Row 24 on this side are electrically connected."
                    },
                    {
                        "id": "pin_G24",
                        "label": "G24",
                        "alias": "Row 24 Tie-Point G",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point G24 on Row 24 (Right (F-J)). All 5 pins in Row 24 on this side are electrically connected."
                    },
                    {
                        "id": "pin_H24",
                        "label": "H24",
                        "alias": "Row 24 Tie-Point H",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point H24 on Row 24 (Right (F-J)). All 5 pins in Row 24 on this side are electrically connected."
                    },
                    {
                        "id": "pin_I24",
                        "label": "I24",
                        "alias": "Row 24 Tie-Point I",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point I24 on Row 24 (Right (F-J)). All 5 pins in Row 24 on this side are electrically connected."
                    },
                    {
                        "id": "pin_J24",
                        "label": "J24",
                        "alias": "Row 24 Tie-Point J",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point J24 on Row 24 (Right (F-J)). All 5 pins in Row 24 on this side are electrically connected."
                    },
                    {
                        "id": "pin_A25",
                        "label": "A25",
                        "alias": "Row 25 Tie-Point A",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point A25 on Row 25 (Left (A-E)). All 5 pins in Row 25 on this side are electrically connected."
                    },
                    {
                        "id": "pin_B25",
                        "label": "B25",
                        "alias": "Row 25 Tie-Point B",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point B25 on Row 25 (Left (A-E)). All 5 pins in Row 25 on this side are electrically connected."
                    },
                    {
                        "id": "pin_C25",
                        "label": "C25",
                        "alias": "Row 25 Tie-Point C",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point C25 on Row 25 (Left (A-E)). All 5 pins in Row 25 on this side are electrically connected."
                    },
                    {
                        "id": "pin_D25",
                        "label": "D25",
                        "alias": "Row 25 Tie-Point D",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point D25 on Row 25 (Left (A-E)). All 5 pins in Row 25 on this side are electrically connected."
                    },
                    {
                        "id": "pin_E25",
                        "label": "E25",
                        "alias": "Row 25 Tie-Point E",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point E25 on Row 25 (Left (A-E)). All 5 pins in Row 25 on this side are electrically connected."
                    },
                    {
                        "id": "pin_F25",
                        "label": "F25",
                        "alias": "Row 25 Tie-Point F",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point F25 on Row 25 (Right (F-J)). All 5 pins in Row 25 on this side are electrically connected."
                    },
                    {
                        "id": "pin_G25",
                        "label": "G25",
                        "alias": "Row 25 Tie-Point G",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point G25 on Row 25 (Right (F-J)). All 5 pins in Row 25 on this side are electrically connected."
                    },
                    {
                        "id": "pin_H25",
                        "label": "H25",
                        "alias": "Row 25 Tie-Point H",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point H25 on Row 25 (Right (F-J)). All 5 pins in Row 25 on this side are electrically connected."
                    },
                    {
                        "id": "pin_I25",
                        "label": "I25",
                        "alias": "Row 25 Tie-Point I",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point I25 on Row 25 (Right (F-J)). All 5 pins in Row 25 on this side are electrically connected."
                    },
                    {
                        "id": "pin_J25",
                        "label": "J25",
                        "alias": "Row 25 Tie-Point J",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point J25 on Row 25 (Right (F-J)). All 5 pins in Row 25 on this side are electrically connected."
                    },
                    {
                        "id": "pin_A26",
                        "label": "A26",
                        "alias": "Row 26 Tie-Point A",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point A26 on Row 26 (Left (A-E)). All 5 pins in Row 26 on this side are electrically connected."
                    },
                    {
                        "id": "pin_B26",
                        "label": "B26",
                        "alias": "Row 26 Tie-Point B",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point B26 on Row 26 (Left (A-E)). All 5 pins in Row 26 on this side are electrically connected."
                    },
                    {
                        "id": "pin_C26",
                        "label": "C26",
                        "alias": "Row 26 Tie-Point C",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point C26 on Row 26 (Left (A-E)). All 5 pins in Row 26 on this side are electrically connected."
                    },
                    {
                        "id": "pin_D26",
                        "label": "D26",
                        "alias": "Row 26 Tie-Point D",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point D26 on Row 26 (Left (A-E)). All 5 pins in Row 26 on this side are electrically connected."
                    },
                    {
                        "id": "pin_E26",
                        "label": "E26",
                        "alias": "Row 26 Tie-Point E",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point E26 on Row 26 (Left (A-E)). All 5 pins in Row 26 on this side are electrically connected."
                    },
                    {
                        "id": "pin_F26",
                        "label": "F26",
                        "alias": "Row 26 Tie-Point F",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point F26 on Row 26 (Right (F-J)). All 5 pins in Row 26 on this side are electrically connected."
                    },
                    {
                        "id": "pin_G26",
                        "label": "G26",
                        "alias": "Row 26 Tie-Point G",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point G26 on Row 26 (Right (F-J)). All 5 pins in Row 26 on this side are electrically connected."
                    },
                    {
                        "id": "pin_H26",
                        "label": "H26",
                        "alias": "Row 26 Tie-Point H",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point H26 on Row 26 (Right (F-J)). All 5 pins in Row 26 on this side are electrically connected."
                    },
                    {
                        "id": "pin_I26",
                        "label": "I26",
                        "alias": "Row 26 Tie-Point I",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point I26 on Row 26 (Right (F-J)). All 5 pins in Row 26 on this side are electrically connected."
                    },
                    {
                        "id": "pin_J26",
                        "label": "J26",
                        "alias": "Row 26 Tie-Point J",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point J26 on Row 26 (Right (F-J)). All 5 pins in Row 26 on this side are electrically connected."
                    },
                    {
                        "id": "pin_A27",
                        "label": "A27",
                        "alias": "Row 27 Tie-Point A",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point A27 on Row 27 (Left (A-E)). All 5 pins in Row 27 on this side are electrically connected."
                    },
                    {
                        "id": "pin_B27",
                        "label": "B27",
                        "alias": "Row 27 Tie-Point B",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point B27 on Row 27 (Left (A-E)). All 5 pins in Row 27 on this side are electrically connected."
                    },
                    {
                        "id": "pin_C27",
                        "label": "C27",
                        "alias": "Row 27 Tie-Point C",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point C27 on Row 27 (Left (A-E)). All 5 pins in Row 27 on this side are electrically connected."
                    },
                    {
                        "id": "pin_D27",
                        "label": "D27",
                        "alias": "Row 27 Tie-Point D",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point D27 on Row 27 (Left (A-E)). All 5 pins in Row 27 on this side are electrically connected."
                    },
                    {
                        "id": "pin_E27",
                        "label": "E27",
                        "alias": "Row 27 Tie-Point E",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point E27 on Row 27 (Left (A-E)). All 5 pins in Row 27 on this side are electrically connected."
                    },
                    {
                        "id": "pin_F27",
                        "label": "F27",
                        "alias": "Row 27 Tie-Point F",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point F27 on Row 27 (Right (F-J)). All 5 pins in Row 27 on this side are electrically connected."
                    },
                    {
                        "id": "pin_G27",
                        "label": "G27",
                        "alias": "Row 27 Tie-Point G",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point G27 on Row 27 (Right (F-J)). All 5 pins in Row 27 on this side are electrically connected."
                    },
                    {
                        "id": "pin_H27",
                        "label": "H27",
                        "alias": "Row 27 Tie-Point H",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point H27 on Row 27 (Right (F-J)). All 5 pins in Row 27 on this side are electrically connected."
                    },
                    {
                        "id": "pin_I27",
                        "label": "I27",
                        "alias": "Row 27 Tie-Point I",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point I27 on Row 27 (Right (F-J)). All 5 pins in Row 27 on this side are electrically connected."
                    },
                    {
                        "id": "pin_J27",
                        "label": "J27",
                        "alias": "Row 27 Tie-Point J",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point J27 on Row 27 (Right (F-J)). All 5 pins in Row 27 on this side are electrically connected."
                    },
                    {
                        "id": "pin_A28",
                        "label": "A28",
                        "alias": "Row 28 Tie-Point A",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point A28 on Row 28 (Left (A-E)). All 5 pins in Row 28 on this side are electrically connected."
                    },
                    {
                        "id": "pin_B28",
                        "label": "B28",
                        "alias": "Row 28 Tie-Point B",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point B28 on Row 28 (Left (A-E)). All 5 pins in Row 28 on this side are electrically connected."
                    },
                    {
                        "id": "pin_C28",
                        "label": "C28",
                        "alias": "Row 28 Tie-Point C",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point C28 on Row 28 (Left (A-E)). All 5 pins in Row 28 on this side are electrically connected."
                    },
                    {
                        "id": "pin_D28",
                        "label": "D28",
                        "alias": "Row 28 Tie-Point D",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point D28 on Row 28 (Left (A-E)). All 5 pins in Row 28 on this side are electrically connected."
                    },
                    {
                        "id": "pin_E28",
                        "label": "E28",
                        "alias": "Row 28 Tie-Point E",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point E28 on Row 28 (Left (A-E)). All 5 pins in Row 28 on this side are electrically connected."
                    },
                    {
                        "id": "pin_F28",
                        "label": "F28",
                        "alias": "Row 28 Tie-Point F",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point F28 on Row 28 (Right (F-J)). All 5 pins in Row 28 on this side are electrically connected."
                    },
                    {
                        "id": "pin_G28",
                        "label": "G28",
                        "alias": "Row 28 Tie-Point G",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point G28 on Row 28 (Right (F-J)). All 5 pins in Row 28 on this side are electrically connected."
                    },
                    {
                        "id": "pin_H28",
                        "label": "H28",
                        "alias": "Row 28 Tie-Point H",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point H28 on Row 28 (Right (F-J)). All 5 pins in Row 28 on this side are electrically connected."
                    },
                    {
                        "id": "pin_I28",
                        "label": "I28",
                        "alias": "Row 28 Tie-Point I",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point I28 on Row 28 (Right (F-J)). All 5 pins in Row 28 on this side are electrically connected."
                    },
                    {
                        "id": "pin_J28",
                        "label": "J28",
                        "alias": "Row 28 Tie-Point J",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point J28 on Row 28 (Right (F-J)). All 5 pins in Row 28 on this side are electrically connected."
                    },
                    {
                        "id": "pin_A29",
                        "label": "A29",
                        "alias": "Row 29 Tie-Point A",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point A29 on Row 29 (Left (A-E)). All 5 pins in Row 29 on this side are electrically connected."
                    },
                    {
                        "id": "pin_B29",
                        "label": "B29",
                        "alias": "Row 29 Tie-Point B",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point B29 on Row 29 (Left (A-E)). All 5 pins in Row 29 on this side are electrically connected."
                    },
                    {
                        "id": "pin_C29",
                        "label": "C29",
                        "alias": "Row 29 Tie-Point C",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point C29 on Row 29 (Left (A-E)). All 5 pins in Row 29 on this side are electrically connected."
                    },
                    {
                        "id": "pin_D29",
                        "label": "D29",
                        "alias": "Row 29 Tie-Point D",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point D29 on Row 29 (Left (A-E)). All 5 pins in Row 29 on this side are electrically connected."
                    },
                    {
                        "id": "pin_E29",
                        "label": "E29",
                        "alias": "Row 29 Tie-Point E",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point E29 on Row 29 (Left (A-E)). All 5 pins in Row 29 on this side are electrically connected."
                    },
                    {
                        "id": "pin_F29",
                        "label": "F29",
                        "alias": "Row 29 Tie-Point F",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point F29 on Row 29 (Right (F-J)). All 5 pins in Row 29 on this side are electrically connected."
                    },
                    {
                        "id": "pin_G29",
                        "label": "G29",
                        "alias": "Row 29 Tie-Point G",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point G29 on Row 29 (Right (F-J)). All 5 pins in Row 29 on this side are electrically connected."
                    },
                    {
                        "id": "pin_H29",
                        "label": "H29",
                        "alias": "Row 29 Tie-Point H",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point H29 on Row 29 (Right (F-J)). All 5 pins in Row 29 on this side are electrically connected."
                    },
                    {
                        "id": "pin_I29",
                        "label": "I29",
                        "alias": "Row 29 Tie-Point I",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point I29 on Row 29 (Right (F-J)). All 5 pins in Row 29 on this side are electrically connected."
                    },
                    {
                        "id": "pin_J29",
                        "label": "J29",
                        "alias": "Row 29 Tie-Point J",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point J29 on Row 29 (Right (F-J)). All 5 pins in Row 29 on this side are electrically connected."
                    },
                    {
                        "id": "pin_A30",
                        "label": "A30",
                        "alias": "Row 30 Tie-Point A",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point A30 on Row 30 (Left (A-E)). All 5 pins in Row 30 on this side are electrically connected."
                    },
                    {
                        "id": "pin_B30",
                        "label": "B30",
                        "alias": "Row 30 Tie-Point B",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point B30 on Row 30 (Left (A-E)). All 5 pins in Row 30 on this side are electrically connected."
                    },
                    {
                        "id": "pin_C30",
                        "label": "C30",
                        "alias": "Row 30 Tie-Point C",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point C30 on Row 30 (Left (A-E)). All 5 pins in Row 30 on this side are electrically connected."
                    },
                    {
                        "id": "pin_D30",
                        "label": "D30",
                        "alias": "Row 30 Tie-Point D",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point D30 on Row 30 (Left (A-E)). All 5 pins in Row 30 on this side are electrically connected."
                    },
                    {
                        "id": "pin_E30",
                        "label": "E30",
                        "alias": "Row 30 Tie-Point E",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point E30 on Row 30 (Left (A-E)). All 5 pins in Row 30 on this side are electrically connected."
                    },
                    {
                        "id": "pin_F30",
                        "label": "F30",
                        "alias": "Row 30 Tie-Point F",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point F30 on Row 30 (Right (F-J)). All 5 pins in Row 30 on this side are electrically connected."
                    },
                    {
                        "id": "pin_G30",
                        "label": "G30",
                        "alias": "Row 30 Tie-Point G",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point G30 on Row 30 (Right (F-J)). All 5 pins in Row 30 on this side are electrically connected."
                    },
                    {
                        "id": "pin_H30",
                        "label": "H30",
                        "alias": "Row 30 Tie-Point H",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point H30 on Row 30 (Right (F-J)). All 5 pins in Row 30 on this side are electrically connected."
                    },
                    {
                        "id": "pin_I30",
                        "label": "I30",
                        "alias": "Row 30 Tie-Point I",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point I30 on Row 30 (Right (F-J)). All 5 pins in Row 30 on this side are electrically connected."
                    },
                    {
                        "id": "pin_J30",
                        "label": "J30",
                        "alias": "Row 30 Tie-Point J",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Terminal point J30 on Row 30 (Right (F-J)). All 5 pins in Row 30 on this side are electrically connected."
                    },
                    {
                        "id": "gnd-l_1",
                        "label": "GND-L_1",
                        "alias": "Left Ground Rail (GND-L) Row 1",
                        "type": "ground",
                        "direction": "passive",
                        "description": "Left Ground Rail (GND-L) point at row 1."
                    },
                    {
                        "id": "vcc-l_1",
                        "label": "VCC-L_1",
                        "alias": "Left Power Rail (VCC-L) Row 1",
                        "type": "power",
                        "direction": "passive",
                        "description": "Left Power Rail (VCC-L) point at row 1."
                    },
                    {
                        "id": "vcc-r_1",
                        "label": "VCC-R_1",
                        "alias": "Right Power Rail (VCC-R) Row 1",
                        "type": "power",
                        "direction": "passive",
                        "description": "Right Power Rail (VCC-R) point at row 1."
                    },
                    {
                        "id": "gnd-r_1",
                        "label": "GND-R_1",
                        "alias": "Right Ground Rail (GND-R) Row 1",
                        "type": "ground",
                        "direction": "passive",
                        "description": "Right Ground Rail (GND-R) point at row 1."
                    },
                    {
                        "id": "gnd-l_2",
                        "label": "GND-L_2",
                        "alias": "Left Ground Rail (GND-L) Row 2",
                        "type": "ground",
                        "direction": "passive",
                        "description": "Left Ground Rail (GND-L) point at row 2."
                    },
                    {
                        "id": "vcc-l_2",
                        "label": "VCC-L_2",
                        "alias": "Left Power Rail (VCC-L) Row 2",
                        "type": "power",
                        "direction": "passive",
                        "description": "Left Power Rail (VCC-L) point at row 2."
                    },
                    {
                        "id": "vcc-r_2",
                        "label": "VCC-R_2",
                        "alias": "Right Power Rail (VCC-R) Row 2",
                        "type": "power",
                        "direction": "passive",
                        "description": "Right Power Rail (VCC-R) point at row 2."
                    },
                    {
                        "id": "gnd-r_2",
                        "label": "GND-R_2",
                        "alias": "Right Ground Rail (GND-R) Row 2",
                        "type": "ground",
                        "direction": "passive",
                        "description": "Right Ground Rail (GND-R) point at row 2."
                    },
                    {
                        "id": "gnd-l_3",
                        "label": "GND-L_3",
                        "alias": "Left Ground Rail (GND-L) Row 3",
                        "type": "ground",
                        "direction": "passive",
                        "description": "Left Ground Rail (GND-L) point at row 3."
                    },
                    {
                        "id": "vcc-l_3",
                        "label": "VCC-L_3",
                        "alias": "Left Power Rail (VCC-L) Row 3",
                        "type": "power",
                        "direction": "passive",
                        "description": "Left Power Rail (VCC-L) point at row 3."
                    },
                    {
                        "id": "vcc-r_3",
                        "label": "VCC-R_3",
                        "alias": "Right Power Rail (VCC-R) Row 3",
                        "type": "power",
                        "direction": "passive",
                        "description": "Right Power Rail (VCC-R) point at row 3."
                    },
                    {
                        "id": "gnd-r_3",
                        "label": "GND-R_3",
                        "alias": "Right Ground Rail (GND-R) Row 3",
                        "type": "ground",
                        "direction": "passive",
                        "description": "Right Ground Rail (GND-R) point at row 3."
                    },
                    {
                        "id": "gnd-l_4",
                        "label": "GND-L_4",
                        "alias": "Left Ground Rail (GND-L) Row 4",
                        "type": "ground",
                        "direction": "passive",
                        "description": "Left Ground Rail (GND-L) point at row 4."
                    },
                    {
                        "id": "vcc-l_4",
                        "label": "VCC-L_4",
                        "alias": "Left Power Rail (VCC-L) Row 4",
                        "type": "power",
                        "direction": "passive",
                        "description": "Left Power Rail (VCC-L) point at row 4."
                    },
                    {
                        "id": "vcc-r_4",
                        "label": "VCC-R_4",
                        "alias": "Right Power Rail (VCC-R) Row 4",
                        "type": "power",
                        "direction": "passive",
                        "description": "Right Power Rail (VCC-R) point at row 4."
                    },
                    {
                        "id": "gnd-r_4",
                        "label": "GND-R_4",
                        "alias": "Right Ground Rail (GND-R) Row 4",
                        "type": "ground",
                        "direction": "passive",
                        "description": "Right Ground Rail (GND-R) point at row 4."
                    },
                    {
                        "id": "gnd-l_5",
                        "label": "GND-L_5",
                        "alias": "Left Ground Rail (GND-L) Row 5",
                        "type": "ground",
                        "direction": "passive",
                        "description": "Left Ground Rail (GND-L) point at row 5."
                    },
                    {
                        "id": "vcc-l_5",
                        "label": "VCC-L_5",
                        "alias": "Left Power Rail (VCC-L) Row 5",
                        "type": "power",
                        "direction": "passive",
                        "description": "Left Power Rail (VCC-L) point at row 5."
                    },
                    {
                        "id": "vcc-r_5",
                        "label": "VCC-R_5",
                        "alias": "Right Power Rail (VCC-R) Row 5",
                        "type": "power",
                        "direction": "passive",
                        "description": "Right Power Rail (VCC-R) point at row 5."
                    },
                    {
                        "id": "gnd-r_5",
                        "label": "GND-R_5",
                        "alias": "Right Ground Rail (GND-R) Row 5",
                        "type": "ground",
                        "direction": "passive",
                        "description": "Right Ground Rail (GND-R) point at row 5."
                    },
                    {
                        "id": "gnd-l_6",
                        "label": "GND-L_6",
                        "alias": "Left Ground Rail (GND-L) Row 6",
                        "type": "ground",
                        "direction": "passive",
                        "description": "Left Ground Rail (GND-L) point at row 6."
                    },
                    {
                        "id": "vcc-l_6",
                        "label": "VCC-L_6",
                        "alias": "Left Power Rail (VCC-L) Row 6",
                        "type": "power",
                        "direction": "passive",
                        "description": "Left Power Rail (VCC-L) point at row 6."
                    },
                    {
                        "id": "vcc-r_6",
                        "label": "VCC-R_6",
                        "alias": "Right Power Rail (VCC-R) Row 6",
                        "type": "power",
                        "direction": "passive",
                        "description": "Right Power Rail (VCC-R) point at row 6."
                    },
                    {
                        "id": "gnd-r_6",
                        "label": "GND-R_6",
                        "alias": "Right Ground Rail (GND-R) Row 6",
                        "type": "ground",
                        "direction": "passive",
                        "description": "Right Ground Rail (GND-R) point at row 6."
                    },
                    {
                        "id": "gnd-l_7",
                        "label": "GND-L_7",
                        "alias": "Left Ground Rail (GND-L) Row 7",
                        "type": "ground",
                        "direction": "passive",
                        "description": "Left Ground Rail (GND-L) point at row 7."
                    },
                    {
                        "id": "vcc-l_7",
                        "label": "VCC-L_7",
                        "alias": "Left Power Rail (VCC-L) Row 7",
                        "type": "power",
                        "direction": "passive",
                        "description": "Left Power Rail (VCC-L) point at row 7."
                    },
                    {
                        "id": "vcc-r_7",
                        "label": "VCC-R_7",
                        "alias": "Right Power Rail (VCC-R) Row 7",
                        "type": "power",
                        "direction": "passive",
                        "description": "Right Power Rail (VCC-R) point at row 7."
                    },
                    {
                        "id": "gnd-r_7",
                        "label": "GND-R_7",
                        "alias": "Right Ground Rail (GND-R) Row 7",
                        "type": "ground",
                        "direction": "passive",
                        "description": "Right Ground Rail (GND-R) point at row 7."
                    },
                    {
                        "id": "gnd-l_8",
                        "label": "GND-L_8",
                        "alias": "Left Ground Rail (GND-L) Row 8",
                        "type": "ground",
                        "direction": "passive",
                        "description": "Left Ground Rail (GND-L) point at row 8."
                    },
                    {
                        "id": "vcc-l_8",
                        "label": "VCC-L_8",
                        "alias": "Left Power Rail (VCC-L) Row 8",
                        "type": "power",
                        "direction": "passive",
                        "description": "Left Power Rail (VCC-L) point at row 8."
                    },
                    {
                        "id": "vcc-r_8",
                        "label": "VCC-R_8",
                        "alias": "Right Power Rail (VCC-R) Row 8",
                        "type": "power",
                        "direction": "passive",
                        "description": "Right Power Rail (VCC-R) point at row 8."
                    },
                    {
                        "id": "gnd-r_8",
                        "label": "GND-R_8",
                        "alias": "Right Ground Rail (GND-R) Row 8",
                        "type": "ground",
                        "direction": "passive",
                        "description": "Right Ground Rail (GND-R) point at row 8."
                    },
                    {
                        "id": "gnd-l_9",
                        "label": "GND-L_9",
                        "alias": "Left Ground Rail (GND-L) Row 9",
                        "type": "ground",
                        "direction": "passive",
                        "description": "Left Ground Rail (GND-L) point at row 9."
                    },
                    {
                        "id": "vcc-l_9",
                        "label": "VCC-L_9",
                        "alias": "Left Power Rail (VCC-L) Row 9",
                        "type": "power",
                        "direction": "passive",
                        "description": "Left Power Rail (VCC-L) point at row 9."
                    },
                    {
                        "id": "vcc-r_9",
                        "label": "VCC-R_9",
                        "alias": "Right Power Rail (VCC-R) Row 9",
                        "type": "power",
                        "direction": "passive",
                        "description": "Right Power Rail (VCC-R) point at row 9."
                    },
                    {
                        "id": "gnd-r_9",
                        "label": "GND-R_9",
                        "alias": "Right Ground Rail (GND-R) Row 9",
                        "type": "ground",
                        "direction": "passive",
                        "description": "Right Ground Rail (GND-R) point at row 9."
                    },
                    {
                        "id": "gnd-l_10",
                        "label": "GND-L_10",
                        "alias": "Left Ground Rail (GND-L) Row 10",
                        "type": "ground",
                        "direction": "passive",
                        "description": "Left Ground Rail (GND-L) point at row 10."
                    },
                    {
                        "id": "vcc-l_10",
                        "label": "VCC-L_10",
                        "alias": "Left Power Rail (VCC-L) Row 10",
                        "type": "power",
                        "direction": "passive",
                        "description": "Left Power Rail (VCC-L) point at row 10."
                    },
                    {
                        "id": "vcc-r_10",
                        "label": "VCC-R_10",
                        "alias": "Right Power Rail (VCC-R) Row 10",
                        "type": "power",
                        "direction": "passive",
                        "description": "Right Power Rail (VCC-R) point at row 10."
                    },
                    {
                        "id": "gnd-r_10",
                        "label": "GND-R_10",
                        "alias": "Right Ground Rail (GND-R) Row 10",
                        "type": "ground",
                        "direction": "passive",
                        "description": "Right Ground Rail (GND-R) point at row 10."
                    },
                    {
                        "id": "gnd-l_11",
                        "label": "GND-L_11",
                        "alias": "Left Ground Rail (GND-L) Row 11",
                        "type": "ground",
                        "direction": "passive",
                        "description": "Left Ground Rail (GND-L) point at row 11."
                    },
                    {
                        "id": "vcc-l_11",
                        "label": "VCC-L_11",
                        "alias": "Left Power Rail (VCC-L) Row 11",
                        "type": "power",
                        "direction": "passive",
                        "description": "Left Power Rail (VCC-L) point at row 11."
                    },
                    {
                        "id": "vcc-r_11",
                        "label": "VCC-R_11",
                        "alias": "Right Power Rail (VCC-R) Row 11",
                        "type": "power",
                        "direction": "passive",
                        "description": "Right Power Rail (VCC-R) point at row 11."
                    },
                    {
                        "id": "gnd-r_11",
                        "label": "GND-R_11",
                        "alias": "Right Ground Rail (GND-R) Row 11",
                        "type": "ground",
                        "direction": "passive",
                        "description": "Right Ground Rail (GND-R) point at row 11."
                    },
                    {
                        "id": "gnd-l_12",
                        "label": "GND-L_12",
                        "alias": "Left Ground Rail (GND-L) Row 12",
                        "type": "ground",
                        "direction": "passive",
                        "description": "Left Ground Rail (GND-L) point at row 12."
                    },
                    {
                        "id": "vcc-l_12",
                        "label": "VCC-L_12",
                        "alias": "Left Power Rail (VCC-L) Row 12",
                        "type": "power",
                        "direction": "passive",
                        "description": "Left Power Rail (VCC-L) point at row 12."
                    },
                    {
                        "id": "vcc-r_12",
                        "label": "VCC-R_12",
                        "alias": "Right Power Rail (VCC-R) Row 12",
                        "type": "power",
                        "direction": "passive",
                        "description": "Right Power Rail (VCC-R) point at row 12."
                    },
                    {
                        "id": "gnd-r_12",
                        "label": "GND-R_12",
                        "alias": "Right Ground Rail (GND-R) Row 12",
                        "type": "ground",
                        "direction": "passive",
                        "description": "Right Ground Rail (GND-R) point at row 12."
                    },
                    {
                        "id": "gnd-l_13",
                        "label": "GND-L_13",
                        "alias": "Left Ground Rail (GND-L) Row 13",
                        "type": "ground",
                        "direction": "passive",
                        "description": "Left Ground Rail (GND-L) point at row 13."
                    },
                    {
                        "id": "vcc-l_13",
                        "label": "VCC-L_13",
                        "alias": "Left Power Rail (VCC-L) Row 13",
                        "type": "power",
                        "direction": "passive",
                        "description": "Left Power Rail (VCC-L) point at row 13."
                    },
                    {
                        "id": "vcc-r_13",
                        "label": "VCC-R_13",
                        "alias": "Right Power Rail (VCC-R) Row 13",
                        "type": "power",
                        "direction": "passive",
                        "description": "Right Power Rail (VCC-R) point at row 13."
                    },
                    {
                        "id": "gnd-r_13",
                        "label": "GND-R_13",
                        "alias": "Right Ground Rail (GND-R) Row 13",
                        "type": "ground",
                        "direction": "passive",
                        "description": "Right Ground Rail (GND-R) point at row 13."
                    },
                    {
                        "id": "gnd-l_14",
                        "label": "GND-L_14",
                        "alias": "Left Ground Rail (GND-L) Row 14",
                        "type": "ground",
                        "direction": "passive",
                        "description": "Left Ground Rail (GND-L) point at row 14."
                    },
                    {
                        "id": "vcc-l_14",
                        "label": "VCC-L_14",
                        "alias": "Left Power Rail (VCC-L) Row 14",
                        "type": "power",
                        "direction": "passive",
                        "description": "Left Power Rail (VCC-L) point at row 14."
                    },
                    {
                        "id": "vcc-r_14",
                        "label": "VCC-R_14",
                        "alias": "Right Power Rail (VCC-R) Row 14",
                        "type": "power",
                        "direction": "passive",
                        "description": "Right Power Rail (VCC-R) point at row 14."
                    },
                    {
                        "id": "gnd-r_14",
                        "label": "GND-R_14",
                        "alias": "Right Ground Rail (GND-R) Row 14",
                        "type": "ground",
                        "direction": "passive",
                        "description": "Right Ground Rail (GND-R) point at row 14."
                    },
                    {
                        "id": "gnd-l_15",
                        "label": "GND-L_15",
                        "alias": "Left Ground Rail (GND-L) Row 15",
                        "type": "ground",
                        "direction": "passive",
                        "description": "Left Ground Rail (GND-L) point at row 15."
                    },
                    {
                        "id": "vcc-l_15",
                        "label": "VCC-L_15",
                        "alias": "Left Power Rail (VCC-L) Row 15",
                        "type": "power",
                        "direction": "passive",
                        "description": "Left Power Rail (VCC-L) point at row 15."
                    },
                    {
                        "id": "vcc-r_15",
                        "label": "VCC-R_15",
                        "alias": "Right Power Rail (VCC-R) Row 15",
                        "type": "power",
                        "direction": "passive",
                        "description": "Right Power Rail (VCC-R) point at row 15."
                    },
                    {
                        "id": "gnd-r_15",
                        "label": "GND-R_15",
                        "alias": "Right Ground Rail (GND-R) Row 15",
                        "type": "ground",
                        "direction": "passive",
                        "description": "Right Ground Rail (GND-R) point at row 15."
                    },
                    {
                        "id": "gnd-l_16",
                        "label": "GND-L_16",
                        "alias": "Left Ground Rail (GND-L) Row 16",
                        "type": "ground",
                        "direction": "passive",
                        "description": "Left Ground Rail (GND-L) point at row 16."
                    },
                    {
                        "id": "vcc-l_16",
                        "label": "VCC-L_16",
                        "alias": "Left Power Rail (VCC-L) Row 16",
                        "type": "power",
                        "direction": "passive",
                        "description": "Left Power Rail (VCC-L) point at row 16."
                    },
                    {
                        "id": "vcc-r_16",
                        "label": "VCC-R_16",
                        "alias": "Right Power Rail (VCC-R) Row 16",
                        "type": "power",
                        "direction": "passive",
                        "description": "Right Power Rail (VCC-R) point at row 16."
                    },
                    {
                        "id": "gnd-r_16",
                        "label": "GND-R_16",
                        "alias": "Right Ground Rail (GND-R) Row 16",
                        "type": "ground",
                        "direction": "passive",
                        "description": "Right Ground Rail (GND-R) point at row 16."
                    },
                    {
                        "id": "gnd-l_17",
                        "label": "GND-L_17",
                        "alias": "Left Ground Rail (GND-L) Row 17",
                        "type": "ground",
                        "direction": "passive",
                        "description": "Left Ground Rail (GND-L) point at row 17."
                    },
                    {
                        "id": "vcc-l_17",
                        "label": "VCC-L_17",
                        "alias": "Left Power Rail (VCC-L) Row 17",
                        "type": "power",
                        "direction": "passive",
                        "description": "Left Power Rail (VCC-L) point at row 17."
                    },
                    {
                        "id": "vcc-r_17",
                        "label": "VCC-R_17",
                        "alias": "Right Power Rail (VCC-R) Row 17",
                        "type": "power",
                        "direction": "passive",
                        "description": "Right Power Rail (VCC-R) point at row 17."
                    },
                    {
                        "id": "gnd-r_17",
                        "label": "GND-R_17",
                        "alias": "Right Ground Rail (GND-R) Row 17",
                        "type": "ground",
                        "direction": "passive",
                        "description": "Right Ground Rail (GND-R) point at row 17."
                    },
                    {
                        "id": "gnd-l_18",
                        "label": "GND-L_18",
                        "alias": "Left Ground Rail (GND-L) Row 18",
                        "type": "ground",
                        "direction": "passive",
                        "description": "Left Ground Rail (GND-L) point at row 18."
                    },
                    {
                        "id": "vcc-l_18",
                        "label": "VCC-L_18",
                        "alias": "Left Power Rail (VCC-L) Row 18",
                        "type": "power",
                        "direction": "passive",
                        "description": "Left Power Rail (VCC-L) point at row 18."
                    },
                    {
                        "id": "vcc-r_18",
                        "label": "VCC-R_18",
                        "alias": "Right Power Rail (VCC-R) Row 18",
                        "type": "power",
                        "direction": "passive",
                        "description": "Right Power Rail (VCC-R) point at row 18."
                    },
                    {
                        "id": "gnd-r_18",
                        "label": "GND-R_18",
                        "alias": "Right Ground Rail (GND-R) Row 18",
                        "type": "ground",
                        "direction": "passive",
                        "description": "Right Ground Rail (GND-R) point at row 18."
                    },
                    {
                        "id": "gnd-l_19",
                        "label": "GND-L_19",
                        "alias": "Left Ground Rail (GND-L) Row 19",
                        "type": "ground",
                        "direction": "passive",
                        "description": "Left Ground Rail (GND-L) point at row 19."
                    },
                    {
                        "id": "vcc-l_19",
                        "label": "VCC-L_19",
                        "alias": "Left Power Rail (VCC-L) Row 19",
                        "type": "power",
                        "direction": "passive",
                        "description": "Left Power Rail (VCC-L) point at row 19."
                    },
                    {
                        "id": "vcc-r_19",
                        "label": "VCC-R_19",
                        "alias": "Right Power Rail (VCC-R) Row 19",
                        "type": "power",
                        "direction": "passive",
                        "description": "Right Power Rail (VCC-R) point at row 19."
                    },
                    {
                        "id": "gnd-r_19",
                        "label": "GND-R_19",
                        "alias": "Right Ground Rail (GND-R) Row 19",
                        "type": "ground",
                        "direction": "passive",
                        "description": "Right Ground Rail (GND-R) point at row 19."
                    },
                    {
                        "id": "gnd-l_20",
                        "label": "GND-L_20",
                        "alias": "Left Ground Rail (GND-L) Row 20",
                        "type": "ground",
                        "direction": "passive",
                        "description": "Left Ground Rail (GND-L) point at row 20."
                    },
                    {
                        "id": "vcc-l_20",
                        "label": "VCC-L_20",
                        "alias": "Left Power Rail (VCC-L) Row 20",
                        "type": "power",
                        "direction": "passive",
                        "description": "Left Power Rail (VCC-L) point at row 20."
                    },
                    {
                        "id": "vcc-r_20",
                        "label": "VCC-R_20",
                        "alias": "Right Power Rail (VCC-R) Row 20",
                        "type": "power",
                        "direction": "passive",
                        "description": "Right Power Rail (VCC-R) point at row 20."
                    },
                    {
                        "id": "gnd-r_20",
                        "label": "GND-R_20",
                        "alias": "Right Ground Rail (GND-R) Row 20",
                        "type": "ground",
                        "direction": "passive",
                        "description": "Right Ground Rail (GND-R) point at row 20."
                    },
                    {
                        "id": "gnd-l_21",
                        "label": "GND-L_21",
                        "alias": "Left Ground Rail (GND-L) Row 21",
                        "type": "ground",
                        "direction": "passive",
                        "description": "Left Ground Rail (GND-L) point at row 21."
                    },
                    {
                        "id": "vcc-l_21",
                        "label": "VCC-L_21",
                        "alias": "Left Power Rail (VCC-L) Row 21",
                        "type": "power",
                        "direction": "passive",
                        "description": "Left Power Rail (VCC-L) point at row 21."
                    },
                    {
                        "id": "vcc-r_21",
                        "label": "VCC-R_21",
                        "alias": "Right Power Rail (VCC-R) Row 21",
                        "type": "power",
                        "direction": "passive",
                        "description": "Right Power Rail (VCC-R) point at row 21."
                    },
                    {
                        "id": "gnd-r_21",
                        "label": "GND-R_21",
                        "alias": "Right Ground Rail (GND-R) Row 21",
                        "type": "ground",
                        "direction": "passive",
                        "description": "Right Ground Rail (GND-R) point at row 21."
                    },
                    {
                        "id": "gnd-l_22",
                        "label": "GND-L_22",
                        "alias": "Left Ground Rail (GND-L) Row 22",
                        "type": "ground",
                        "direction": "passive",
                        "description": "Left Ground Rail (GND-L) point at row 22."
                    },
                    {
                        "id": "vcc-l_22",
                        "label": "VCC-L_22",
                        "alias": "Left Power Rail (VCC-L) Row 22",
                        "type": "power",
                        "direction": "passive",
                        "description": "Left Power Rail (VCC-L) point at row 22."
                    },
                    {
                        "id": "vcc-r_22",
                        "label": "VCC-R_22",
                        "alias": "Right Power Rail (VCC-R) Row 22",
                        "type": "power",
                        "direction": "passive",
                        "description": "Right Power Rail (VCC-R) point at row 22."
                    },
                    {
                        "id": "gnd-r_22",
                        "label": "GND-R_22",
                        "alias": "Right Ground Rail (GND-R) Row 22",
                        "type": "ground",
                        "direction": "passive",
                        "description": "Right Ground Rail (GND-R) point at row 22."
                    },
                    {
                        "id": "gnd-l_23",
                        "label": "GND-L_23",
                        "alias": "Left Ground Rail (GND-L) Row 23",
                        "type": "ground",
                        "direction": "passive",
                        "description": "Left Ground Rail (GND-L) point at row 23."
                    },
                    {
                        "id": "vcc-l_23",
                        "label": "VCC-L_23",
                        "alias": "Left Power Rail (VCC-L) Row 23",
                        "type": "power",
                        "direction": "passive",
                        "description": "Left Power Rail (VCC-L) point at row 23."
                    },
                    {
                        "id": "vcc-r_23",
                        "label": "VCC-R_23",
                        "alias": "Right Power Rail (VCC-R) Row 23",
                        "type": "power",
                        "direction": "passive",
                        "description": "Right Power Rail (VCC-R) point at row 23."
                    },
                    {
                        "id": "gnd-r_23",
                        "label": "GND-R_23",
                        "alias": "Right Ground Rail (GND-R) Row 23",
                        "type": "ground",
                        "direction": "passive",
                        "description": "Right Ground Rail (GND-R) point at row 23."
                    },
                    {
                        "id": "gnd-l_24",
                        "label": "GND-L_24",
                        "alias": "Left Ground Rail (GND-L) Row 24",
                        "type": "ground",
                        "direction": "passive",
                        "description": "Left Ground Rail (GND-L) point at row 24."
                    },
                    {
                        "id": "vcc-l_24",
                        "label": "VCC-L_24",
                        "alias": "Left Power Rail (VCC-L) Row 24",
                        "type": "power",
                        "direction": "passive",
                        "description": "Left Power Rail (VCC-L) point at row 24."
                    },
                    {
                        "id": "vcc-r_24",
                        "label": "VCC-R_24",
                        "alias": "Right Power Rail (VCC-R) Row 24",
                        "type": "power",
                        "direction": "passive",
                        "description": "Right Power Rail (VCC-R) point at row 24."
                    },
                    {
                        "id": "gnd-r_24",
                        "label": "GND-R_24",
                        "alias": "Right Ground Rail (GND-R) Row 24",
                        "type": "ground",
                        "direction": "passive",
                        "description": "Right Ground Rail (GND-R) point at row 24."
                    },
                    {
                        "id": "gnd-l_25",
                        "label": "GND-L_25",
                        "alias": "Left Ground Rail (GND-L) Row 25",
                        "type": "ground",
                        "direction": "passive",
                        "description": "Left Ground Rail (GND-L) point at row 25."
                    },
                    {
                        "id": "vcc-l_25",
                        "label": "VCC-L_25",
                        "alias": "Left Power Rail (VCC-L) Row 25",
                        "type": "power",
                        "direction": "passive",
                        "description": "Left Power Rail (VCC-L) point at row 25."
                    },
                    {
                        "id": "vcc-r_25",
                        "label": "VCC-R_25",
                        "alias": "Right Power Rail (VCC-R) Row 25",
                        "type": "power",
                        "direction": "passive",
                        "description": "Right Power Rail (VCC-R) point at row 25."
                    },
                    {
                        "id": "gnd-r_25",
                        "label": "GND-R_25",
                        "alias": "Right Ground Rail (GND-R) Row 25",
                        "type": "ground",
                        "direction": "passive",
                        "description": "Right Ground Rail (GND-R) point at row 25."
                    },
                    {
                        "id": "gnd-l_26",
                        "label": "GND-L_26",
                        "alias": "Left Ground Rail (GND-L) Row 26",
                        "type": "ground",
                        "direction": "passive",
                        "description": "Left Ground Rail (GND-L) point at row 26."
                    },
                    {
                        "id": "vcc-l_26",
                        "label": "VCC-L_26",
                        "alias": "Left Power Rail (VCC-L) Row 26",
                        "type": "power",
                        "direction": "passive",
                        "description": "Left Power Rail (VCC-L) point at row 26."
                    },
                    {
                        "id": "vcc-r_26",
                        "label": "VCC-R_26",
                        "alias": "Right Power Rail (VCC-R) Row 26",
                        "type": "power",
                        "direction": "passive",
                        "description": "Right Power Rail (VCC-R) point at row 26."
                    },
                    {
                        "id": "gnd-r_26",
                        "label": "GND-R_26",
                        "alias": "Right Ground Rail (GND-R) Row 26",
                        "type": "ground",
                        "direction": "passive",
                        "description": "Right Ground Rail (GND-R) point at row 26."
                    },
                    {
                        "id": "gnd-l_27",
                        "label": "GND-L_27",
                        "alias": "Left Ground Rail (GND-L) Row 27",
                        "type": "ground",
                        "direction": "passive",
                        "description": "Left Ground Rail (GND-L) point at row 27."
                    },
                    {
                        "id": "vcc-l_27",
                        "label": "VCC-L_27",
                        "alias": "Left Power Rail (VCC-L) Row 27",
                        "type": "power",
                        "direction": "passive",
                        "description": "Left Power Rail (VCC-L) point at row 27."
                    },
                    {
                        "id": "vcc-r_27",
                        "label": "VCC-R_27",
                        "alias": "Right Power Rail (VCC-R) Row 27",
                        "type": "power",
                        "direction": "passive",
                        "description": "Right Power Rail (VCC-R) point at row 27."
                    },
                    {
                        "id": "gnd-r_27",
                        "label": "GND-R_27",
                        "alias": "Right Ground Rail (GND-R) Row 27",
                        "type": "ground",
                        "direction": "passive",
                        "description": "Right Ground Rail (GND-R) point at row 27."
                    },
                    {
                        "id": "gnd-l_28",
                        "label": "GND-L_28",
                        "alias": "Left Ground Rail (GND-L) Row 28",
                        "type": "ground",
                        "direction": "passive",
                        "description": "Left Ground Rail (GND-L) point at row 28."
                    },
                    {
                        "id": "vcc-l_28",
                        "label": "VCC-L_28",
                        "alias": "Left Power Rail (VCC-L) Row 28",
                        "type": "power",
                        "direction": "passive",
                        "description": "Left Power Rail (VCC-L) point at row 28."
                    },
                    {
                        "id": "vcc-r_28",
                        "label": "VCC-R_28",
                        "alias": "Right Power Rail (VCC-R) Row 28",
                        "type": "power",
                        "direction": "passive",
                        "description": "Right Power Rail (VCC-R) point at row 28."
                    },
                    {
                        "id": "gnd-r_28",
                        "label": "GND-R_28",
                        "alias": "Right Ground Rail (GND-R) Row 28",
                        "type": "ground",
                        "direction": "passive",
                        "description": "Right Ground Rail (GND-R) point at row 28."
                    },
                    {
                        "id": "gnd-l_29",
                        "label": "GND-L_29",
                        "alias": "Left Ground Rail (GND-L) Row 29",
                        "type": "ground",
                        "direction": "passive",
                        "description": "Left Ground Rail (GND-L) point at row 29."
                    },
                    {
                        "id": "vcc-l_29",
                        "label": "VCC-L_29",
                        "alias": "Left Power Rail (VCC-L) Row 29",
                        "type": "power",
                        "direction": "passive",
                        "description": "Left Power Rail (VCC-L) point at row 29."
                    },
                    {
                        "id": "vcc-r_29",
                        "label": "VCC-R_29",
                        "alias": "Right Power Rail (VCC-R) Row 29",
                        "type": "power",
                        "direction": "passive",
                        "description": "Right Power Rail (VCC-R) point at row 29."
                    },
                    {
                        "id": "gnd-r_29",
                        "label": "GND-R_29",
                        "alias": "Right Ground Rail (GND-R) Row 29",
                        "type": "ground",
                        "direction": "passive",
                        "description": "Right Ground Rail (GND-R) point at row 29."
                    },
                    {
                        "id": "gnd-l_30",
                        "label": "GND-L_30",
                        "alias": "Left Ground Rail (GND-L) Row 30",
                        "type": "ground",
                        "direction": "passive",
                        "description": "Left Ground Rail (GND-L) point at row 30."
                    },
                    {
                        "id": "vcc-l_30",
                        "label": "VCC-L_30",
                        "alias": "Left Power Rail (VCC-L) Row 30",
                        "type": "power",
                        "direction": "passive",
                        "description": "Left Power Rail (VCC-L) point at row 30."
                    },
                    {
                        "id": "vcc-r_30",
                        "label": "VCC-R_30",
                        "alias": "Right Power Rail (VCC-R) Row 30",
                        "type": "power",
                        "direction": "passive",
                        "description": "Right Power Rail (VCC-R) point at row 30."
                    },
                    {
                        "id": "gnd-r_30",
                        "label": "GND-R_30",
                        "alias": "Right Ground Rail (GND-R) Row 30",
                        "type": "ground",
                        "direction": "passive",
                        "description": "Right Ground Rail (GND-R) point at row 30."
                    }
                ],
                "stubLength": 5,
                "instanceNumber": 1,
                "rotation": 90
            },
            "zIndex": 0,
            "width": 220,
            "height": 340,
            "selected": false,
            "dragging": false,
            "positionAbsolute": {
                "x": 915,
                "y": 290
            }
        },
        {
            "id": "lcd1602-i2c-1792314502664-easnr",
            "type": "electronicNode",
            "position": {
                "x": 810,
                "y": 620
            },
            "data": {
                "componentType": "lcd1602-i2c",
                "tag": "wokwi-lcd1602",
                "props": {
                    "pins": "i2c"
                },
                "label": "LCD 1602 I2C-1",
                "pins": [
                    {
                        "id": "gnd",
                        "label": "GND",
                        "alias": "Ground (0V)",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Ground reference terminal. Connects to the ground (0V) of the power supply."
                    },
                    {
                        "id": "vcc",
                        "label": "VCC",
                        "alias": "Power (+5V)",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Power supply input terminal. Connects to positive voltage (typically +5V DC)."
                    },
                    {
                        "id": "sda",
                        "label": "SDA",
                        "alias": "Serial Data",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "I2C Serial Data line. Used to transfer data bidirectionally between the microcontroller and the display."
                    },
                    {
                        "id": "scl",
                        "label": "SCL",
                        "alias": "Serial Clock",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "I2C Serial Clock line. Carries the timing clock signal generated by the microcontroller for synchronized data transfer."
                    }
                ],
                "stubLength": 5,
                "instanceNumber": 1
            },
            "zIndex": 10,
            "width": 305,
            "height": 145,
            "selected": false,
            "positionAbsolute": {
                "x": 810,
                "y": 620
            },
            "dragging": false
        },
        {
            "id": "buzzer-1792314602100-blsn1",
            "type": "electronicNode",
            "position": {
                "x": 945,
                "y": 205
            },
            "data": {
                "componentType": "buzzer",
                "tag": "wokwi-buzzer",
                "props": {},
                "label": "Buzzer-1",
                "pins": [
                    {
                        "id": "positive",
                        "label": "Positive",
                        "alias": "VCC / Signal (+)",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "The positive terminal of the buzzer. For active buzzers, this connects to a DC voltage source. For passive buzzers, it connects to a PWM or audio signal."
                    },
                    {
                        "id": "negative",
                        "label": "Negative",
                        "alias": "GND (-)",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "The negative terminal of the buzzer. This terminal should typically be connected to the ground (GND) of the circuit."
                    }
                ],
                "stubLength": 5,
                "instanceNumber": 1
            },
            "zIndex": 10,
            "width": 77,
            "height": 96,
            "selected": false,
            "positionAbsolute": {
                "x": 945,
                "y": 205
            },
            "dragging": false
        },
        {
            "id": "led-red-1792314867371-l0em9",
            "type": "electronicNode",
            "position": {
                "x": 965,
                "y": 435
            },
            "data": {
                "componentType": "led-red",
                "tag": "wokwi-led",
                "props": {
                    "color": "red"
                },
                "label": "Red LED-1",
                "pins": [
                    {
                        "id": "anode",
                        "label": "Anode",
                        "alias": "Positive (+)",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "The positive terminal (Anode) of the LED. Current must flow from Anode to Cathode for the LED to emit light."
                    },
                    {
                        "id": "cathode",
                        "label": "Cathode",
                        "alias": "Negative (-)",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "The negative terminal (Cathode) of the LED. This terminal should typically point towards the ground or negative side of the voltage source."
                    }
                ],
                "stubLength": 5,
                "instanceNumber": 1,
                "rotation": 270
            },
            "zIndex": 10,
            "width": 42,
            "height": 52,
            "selected": false,
            "positionAbsolute": {
                "x": 965,
                "y": 435
            },
            "dragging": false
        },
        {
            "id": "resistor-1792314936244-yk1md",
            "type": "electronicNode",
            "position": {
                "x": 1030,
                "y": 520
            },
            "data": {
                "componentType": "resistor",
                "tag": "wokwi-resistor",
                "props": {
                    "value": "220"
                },
                "label": "Resistor-1",
                "pins": [
                    {
                        "id": "pin1",
                        "label": "Pin 1",
                        "alias": "Terminal 1",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "First passive terminal of the resistor. Because a resistor is non-polarized, terminal A and terminal B are electrically interchangeable."
                    },
                    {
                        "id": "pin2",
                        "label": "Pin 2",
                        "alias": "Terminal 2",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Second passive terminal of the resistor. Because a resistor is non-polarized, terminal B and terminal A are electrically interchangeable."
                    }
                ],
                "stubLength": 5,
                "instanceNumber": 1
            },
            "zIndex": 10,
            "width": 61,
            "height": 26,
            "selected": false,
            "positionAbsolute": {
                "x": 1030,
                "y": 520
            },
            "dragging": false
        },
        {
            "id": "hc-sr04-1792918852438-icwzu",
            "type": "electronicNode",
            "position": {
                "x": 715,
                "y": 130
            },
            "data": {
                "componentType": "hc-sr04",
                "tag": "wokwi-hc-sr04",
                "props": {},
                "label": "HC-SR04-2",
                "isValid": true,
                "pins": [
                    {
                        "id": "vcc",
                        "label": "VCC",
                        "alias": "5V Power",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Power supply input terminal. Connects to the positive supply voltage (typically +5V DC)."
                    },
                    {
                        "id": "trig",
                        "label": "Trig",
                        "alias": "Trigger Pin",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Trigger input pin. Receiving a HIGH pulse for at least 10 microseconds commands the sensor to emit an ultrasonic sound burst."
                    },
                    {
                        "id": "echo",
                        "label": "Echo",
                        "alias": "Echo Pin",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Echo output pin. Emits a HIGH signal pulse whose duration is proportional to the distance of the detected obstacle."
                    },
                    {
                        "id": "gnd",
                        "label": "GND",
                        "alias": "Ground",
                        "type": "terminal",
                        "direction": "passive",
                        "description": "Ground reference terminal. Connects to the ground (0V) of the circuit power supply."
                    }
                ],
                "stubLength": 5,
                "instanceNumber": 2,
                "ultrasonicDistanceCm": 18
            },
            "zIndex": 10,
            "width": 172,
            "height": 103,
            "selected": true,
            "positionAbsolute": {
                "x": 715,
                "y": 130
            },
            "dragging": false
        }
    ],
    "edges": [
        {
            "type": "editable",
            "zIndex": 1000,
            "id": "wire-1792314511011-fwkksj",
            "source": "lcd1602-i2c-1792314502664-easnr",
            "sourceHandle": "SDA",
            "target": "arduino-uno-1792314481962-gs2sh",
            "targetHandle": "A4",
            "data": {
                "points": null,
                "sourceNodeId": "lcd1602-i2c-1792314502664-easnr",
                "sourcePinId": "SDA",
                "targetNodeId": "arduino-uno-1792314481962-gs2sh",
                "targetPinId": "A4",
                "validation": {
                    "isValid": true
                },
                "simulation": {
                    "isActive": false,
                    "traceActive": false
                }
            },
            "style": {
                "strokeWidth": 2,
                "stroke": "#06b6d4"
            }
        },
        {
            "type": "editable",
            "zIndex": 1000,
            "id": "wire-1792314513941-gk2mhd",
            "source": "lcd1602-i2c-1792314502664-easnr",
            "sourceHandle": "SCL",
            "target": "arduino-uno-1792314481962-gs2sh",
            "targetHandle": "A5",
            "data": {
                "points": null,
                "sourceNodeId": "lcd1602-i2c-1792314502664-easnr",
                "sourcePinId": "SCL",
                "targetNodeId": "arduino-uno-1792314481962-gs2sh",
                "targetPinId": "A5",
                "validation": {
                    "isValid": true
                },
                "simulation": {
                    "isActive": false,
                    "traceActive": false
                }
            },
            "style": {
                "strokeWidth": 2,
                "stroke": "#06b6d4"
            }
        },
        {
            "type": "editable",
            "zIndex": 1000,
            "id": "wire-1792314532577-zne34n",
            "source": "lcd1602-i2c-1792314502664-easnr",
            "sourceHandle": "GND",
            "target": "half-board-1792314487002-9yb4o",
            "targetHandle": "GND-R_28",
            "data": {
                "points": [
                    {
                        "x": 789.9093456548453,
                        "y": 648.1128215786491
                    },
                    {
                        "x": 789.9093456548453,
                        "y": 648.1128215786491
                    },
                    {
                        "x": 780,
                        "y": 653.1128442685291
                    },
                    {
                        "x": 780,
                        "y": 590
                    },
                    {
                        "x": 856.8990774835084,
                        "y": 590
                    },
                    {
                        "x": 856.8990774835084,
                        "y": 590
                    },
                    {
                        "x": 898.8889491505284,
                        "y": 590
                    },
                    {
                        "x": 893.8888093121716,
                        "y": 556.411059469912
                    },
                    {
                        "x": 893.8888093121716,
                        "y": 556.411059469912
                    }
                ],
                "sourceNodeId": "lcd1602-i2c-1792314502664-easnr",
                "sourcePinId": "GND",
                "targetNodeId": "half-board-1792314487002-9yb4o",
                "targetPinId": "GND-R_28",
                "validation": {
                    "isValid": true
                },
                "simulation": {
                    "isActive": false,
                    "traceActive": false
                }
            },
            "style": {
                "strokeWidth": 2,
                "stroke": "#111827"
            },
            "selected": false
        },
        {
            "type": "editable",
            "zIndex": 1000,
            "id": "wire-1792314557755-jktata",
            "source": "lcd1602-i2c-1792314502664-easnr",
            "sourceHandle": "VCC",
            "target": "half-board-1792314487002-9yb4o",
            "targetHandle": "VCC-R_27",
            "data": {
                "points": [
                    {
                        "x": 814.9093456548453,
                        "y": 662.6094520391642
                    },
                    {
                        "x": 814.9093456548453,
                        "y": 662.6094520391642
                    },
                    {
                        "x": 790,
                        "y": 662.6093797780992
                    },
                    {
                        "x": 790,
                        "y": 600
                    },
                    {
                        "x": 861.8990936591496,
                        "y": 600
                    },
                    {
                        "x": 861.8990936591496,
                        "y": 600
                    },
                    {
                        "x": 908.8889186597766,
                        "y": 600
                    },
                    {
                        "x": 908.8888416634538,
                        "y": 546.4110271186297
                    },
                    {
                        "x": 908.8888416634538,
                        "y": 546.4110271186297
                    }
                ],
                "sourceNodeId": "lcd1602-i2c-1792314502664-easnr",
                "sourcePinId": "VCC",
                "targetNodeId": "half-board-1792314487002-9yb4o",
                "targetPinId": "VCC-R_27",
                "validation": {
                    "isValid": true
                },
                "simulation": {
                    "isActive": false,
                    "traceActive": false
                }
            },
            "style": {
                "strokeWidth": 2,
                "stroke": "#ef4444"
            },
            "selected": false
        },
        {
            "type": "editable",
            "zIndex": 1000,
            "id": "wire-1792314620048-zuyyo3",
            "source": "hc-sr04-1792918852438-icwzu",
            "sourceHandle": "GND",
            "target": "half-board-1792314487002-9yb4o",
            "targetHandle": "GND-L_26",
            "data": {
                "points": [
                    {
                        "x": 842.4006198793486,
                        "y": 255.81250394918015
                    },
                    {
                        "x": 842.4006198793486,
                        "y": 255.81250394918015
                    },
                    {
                        "x": 817.4008347286504,
                        "y": 290
                    },
                    {
                        "x": 918.8888881690245,
                        "y": 290
                    },
                    {
                        "x": 918.8888740147361,
                        "y": 366.4111071601643
                    },
                    {
                        "x": 918.8888740147361,
                        "y": 366.4111071601643
                    }
                ],
                "sourceNodeId": "hc-sr04-1792918852438-icwzu",
                "sourcePinId": "GND",
                "targetNodeId": "half-board-1792314487002-9yb4o",
                "targetPinId": "GND-L_26",
                "validation": {
                    "isValid": true
                },
                "simulation": {
                    "isActive": false,
                    "traceActive": false
                }
            },
            "style": {
                "strokeWidth": 2,
                "stroke": "#111827"
            },
            "selected": false
        },
        {
            "type": "editable",
            "zIndex": 1000,
            "id": "wire-1792314633949-0uoq5j",
            "source": "hc-sr04-1792918852438-icwzu",
            "sourceHandle": "VCC",
            "target": "half-board-1792314487002-9yb4o",
            "targetHandle": "VCC-L_27",
            "data": {
                "points": [
                    {
                        "x": 812.4008355927836,
                        "y": 255.81250394918015
                    },
                    {
                        "x": 812.4008355927836,
                        "y": 255.81250394918015
                    },
                    {
                        "x": 787.4008806440191,
                        "y": 300
                    },
                    {
                        "x": 908.8889186597766,
                        "y": 300
                    },
                    {
                        "x": 918.8888740147361,
                        "y": 376.41106978885546
                    },
                    {
                        "x": 918.8888740147361,
                        "y": 376.41106978885546
                    }
                ],
                "sourceNodeId": "hc-sr04-1792918852438-icwzu",
                "sourcePinId": "VCC",
                "targetNodeId": "half-board-1792314487002-9yb4o",
                "targetPinId": "VCC-L_27",
                "validation": {
                    "isValid": true
                },
                "simulation": {
                    "isActive": false,
                    "traceActive": false
                }
            },
            "style": {
                "strokeWidth": 2,
                "stroke": "#ef4444"
            },
            "selected": false
        },
        {
            "type": "editable",
            "zIndex": 1000,
            "id": "wire-1792314651170-vkfucf",
            "source": "arduino-uno-1792314481962-gs2sh",
            "sourceHandle": "5V",
            "target": "half-board-1792314487002-9yb4o",
            "targetHandle": "VCC-R_30",
            "data": {
                "points": [
                    {
                        "x": 676.1163508148757,
                        "y": 552.809439605617
                    },
                    {
                        "x": 676.1163508148757,
                        "y": 552.809439605617
                    },
                    {
                        "x": 676.1163323963777,
                        "y": 580
                    },
                    {
                        "x": 800,
                        "y": 580
                    },
                    {
                        "x": 800,
                        "y": 580
                    },
                    {
                        "x": 840,
                        "y": 580
                    },
                    {
                        "x": 840,
                        "y": 550
                    },
                    {
                        "x": 878.8889468627098,
                        "y": 550
                    },
                    {
                        "x": 878.8888143321981,
                        "y": 546.4110271186297
                    },
                    {
                        "x": 878.8888143321981,
                        "y": 546.4110271186297
                    }
                ],
                "sourceNodeId": "arduino-uno-1792314481962-gs2sh",
                "sourcePinId": "5V",
                "targetNodeId": "half-board-1792314487002-9yb4o",
                "targetPinId": "VCC-R_30",
                "validation": {
                    "isValid": true
                },
                "simulation": {
                    "isActive": false,
                    "traceActive": false
                }
            },
            "style": {
                "strokeWidth": 2,
                "stroke": "#ef4444"
            },
            "selected": false
        },
        {
            "type": "editable",
            "zIndex": 1000,
            "id": "wire-1792314677421-cx9j9e",
            "source": "arduino-uno-1792314481962-gs2sh",
            "sourceHandle": "GND1",
            "target": "half-board-1792314487002-9yb4o",
            "targetHandle": "GND-R_30",
            "data": {
                "points": [
                    {
                        "x": 685.6128801777679,
                        "y": 552.809439605617
                    },
                    {
                        "x": 685.6128801777679,
                        "y": 552.809439605617
                    },
                    {
                        "x": 685.6129311752705,
                        "y": 570
                    },
                    {
                        "x": 878.8889468627098,
                        "y": 570
                    },
                    {
                        "x": 878.8888143321981,
                        "y": 556.411059469912
                    },
                    {
                        "x": 878.8888143321981,
                        "y": 556.411059469912
                    }
                ],
                "sourceNodeId": "arduino-uno-1792314481962-gs2sh",
                "sourcePinId": "GND1",
                "targetNodeId": "half-board-1792314487002-9yb4o",
                "targetPinId": "GND-R_30",
                "validation": {
                    "isValid": true
                },
                "simulation": {
                    "isActive": false,
                    "traceActive": false
                }
            },
            "style": {
                "strokeWidth": 2,
                "stroke": "#111827"
            },
            "selected": false
        },
        {
            "type": "editable",
            "zIndex": 1000,
            "id": "wire-1792314809817-deq3vh",
            "source": "hc-sr04-1792918852438-icwzu",
            "sourceHandle": "TRIG",
            "target": "arduino-uno-1792314481962-gs2sh",
            "targetHandle": "D6",
            "data": {
                "points": [
                    {
                        "x": 822.4008269399575,
                        "y": 255.81250394918015
                    },
                    {
                        "x": 822.4008269399575,
                        "y": 255.81250394918015
                    },
                    {
                        "x": 797.4008653388962,
                        "y": 280
                    },
                    {
                        "x": 714.605971703659,
                        "y": 280
                    },
                    {
                        "x": 679.1024884005225,
                        "y": 369.9093712534101
                    },
                    {
                        "x": 679.1024884005225,
                        "y": 369.9093712534101
                    }
                ],
                "sourceNodeId": "hc-sr04-1792918852438-icwzu",
                "sourcePinId": "TRIG",
                "targetNodeId": "arduino-uno-1792314481962-gs2sh",
                "targetPinId": "D6",
                "validation": {
                    "isValid": true
                },
                "simulation": {
                    "isActive": false,
                    "traceActive": false
                }
            },
            "style": {
                "strokeWidth": 2,
                "stroke": "#8b5cf6"
            },
            "selected": false
        },
        {
            "type": "editable",
            "zIndex": 1000,
            "id": "wire-1792314820080-wrb7of",
            "source": "hc-sr04-1792918852438-icwzu",
            "sourceHandle": "ECHO",
            "target": "arduino-uno-1792314481962-gs2sh",
            "targetHandle": "D7",
            "data": {
                "points": [
                    {
                        "x": 832.4007234096531,
                        "y": 255.81250394918015
                    },
                    {
                        "x": 832.4007234096531,
                        "y": 255.81250394918015
                    },
                    {
                        "x": 807.4008898908643,
                        "y": 290
                    },
                    {
                        "x": 705.1094361940889,
                        "y": 290
                    },
                    {
                        "x": 669.6059590376301,
                        "y": 369.9093712534101
                    },
                    {
                        "x": 669.6059590376301,
                        "y": 369.9093712534101
                    }
                ],
                "sourceNodeId": "hc-sr04-1792918852438-icwzu",
                "sourcePinId": "ECHO",
                "targetNodeId": "arduino-uno-1792314481962-gs2sh",
                "targetPinId": "D7",
                "validation": {
                    "isValid": true
                },
                "simulation": {
                    "isActive": false,
                    "traceActive": false
                }
            },
            "style": {
                "strokeWidth": 2,
                "stroke": "#22c55e"
            },
            "selected": false
        },
        {
            "type": "editable",
            "zIndex": 1000,
            "id": "wire-1792314848036-ua60hf",
            "source": "buzzer-1792314602100-blsn1",
            "sourceHandle": "positive",
            "target": "arduino-uno-1792314481962-gs2sh",
            "targetHandle": "D8",
            "data": {
                "points": [
                    {
                        "x": 983.1126367207235,
                        "y": 300.30903660998547
                    },
                    {
                        "x": 983.1126367207235,
                        "y": 300.30903660998547
                    },
                    {
                        "x": 983.112829023153,
                        "y": 330
                    },
                    {
                        "x": 689.1024873922158,
                        "y": 330
                    },
                    {
                        "x": 689.1024795106068,
                        "y": 369.9093712534101
                    },
                    {
                        "x": 689.1024795106068,
                        "y": 369.9093712534101
                    }
                ],
                "sourceNodeId": "buzzer-1792314602100-blsn1",
                "sourcePinId": "positive",
                "targetNodeId": "arduino-uno-1792314481962-gs2sh",
                "targetPinId": "D8",
                "validation": {
                    "isValid": true
                },
                "simulation": {
                    "isActive": false,
                    "traceActive": false
                }
            },
            "style": {
                "strokeWidth": 2,
                "stroke": "#22c55e"
            },
            "selected": false
        },
        {
            "type": "editable",
            "zIndex": 1000,
            "id": "wire-1792314857847-n7i0d2",
            "source": "buzzer-1792314602100-blsn1",
            "sourceHandle": "negative",
            "target": "half-board-1792314487002-9yb4o",
            "targetHandle": "GND-L_21",
            "data": {
                "points": null,
                "sourceNodeId": "buzzer-1792314602100-blsn1",
                "sourcePinId": "negative",
                "targetNodeId": "half-board-1792314487002-9yb4o",
                "targetPinId": "GND-L_21",
                "validation": {
                    "isValid": true
                },
                "simulation": {
                    "isActive": false,
                    "traceActive": false
                }
            },
            "style": {
                "strokeWidth": 2,
                "stroke": "#111827"
            }
        },
        {
            "type": "editable",
            "zIndex": 1000,
            "id": "wire-1792314890658-965jav",
            "source": "led-red-1792314867371-l0em9",
            "sourceHandle": "anode",
            "target": "half-board-1792314487002-9yb4o",
            "targetHandle": "pin_E17",
            "data": {
                "points": [
                    {
                        "x": 1003.1126367207235,
                        "y": 455.3266656993718
                    },
                    {
                        "x": 1003.1126367207235,
                        "y": 455.3266656993718
                    },
                    {
                        "x": 1003.112829023153,
                        "y": 460
                    },
                    {
                        "x": 1008.8889300988701,
                        "y": 460
                    },
                    {
                        "x": 1008.8887468407299,
                        "y": 436.41108959007136
                    },
                    {
                        "x": 1008.8887468407299,
                        "y": 436.41108959007136
                    }
                ],
                "sourceNodeId": "led-red-1792314867371-l0em9",
                "sourcePinId": "anode",
                "targetNodeId": "half-board-1792314487002-9yb4o",
                "targetPinId": "pin_E17",
                "validation": {
                    "isValid": true
                },
                "simulation": {
                    "isActive": false,
                    "traceActive": false
                }
            },
            "style": {
                "strokeWidth": 2,
                "stroke": "#10b981"
            },
            "selected": false
        },
        {
            "type": "editable",
            "zIndex": 1000,
            "id": "wire-1792314894414-pxng7j",
            "source": "half-board-1792314487002-9yb4o",
            "sourceHandle": "pin_A17",
            "target": "arduino-uno-1792314481962-gs2sh",
            "targetHandle": "D13",
            "data": {
                "points": [
                    {
                        "x": 1008.8887468407299,
                        "y": 396.4110647688289
                    },
                    {
                        "x": 1008.8887468407299,
                        "y": 396.4110647688289
                    },
                    {
                        "x": 1008.8889300988701,
                        "y": 350
                    },
                    {
                        "x": 641.1163758446869,
                        "y": 350
                    },
                    {
                        "x": 641.1163489876993,
                        "y": 369.9093712534101
                    },
                    {
                        "x": 641.1163489876993,
                        "y": 369.9093712534101
                    }
                ],
                "sourceNodeId": "half-board-1792314487002-9yb4o",
                "sourcePinId": "pin_A17",
                "targetNodeId": "arduino-uno-1792314481962-gs2sh",
                "targetPinId": "D13",
                "validation": {
                    "isValid": true
                },
                "simulation": {
                    "isActive": false,
                    "traceActive": false
                }
            },
            "style": {
                "strokeWidth": 2,
                "stroke": "#ef4444"
            },
            "selected": false
        },
        {
            "id": "wire-1792314926149-zynwyb",
            "source": "half-board-1792314487002-9yb4o",
            "sourceHandle": "pin_F17",
            "target": "led-red-1792314867371-l0em9",
            "targetHandle": "cathode",
            "type": "editable",
            "data": {
                "points": null,
                "sourceNodeId": "half-board-1792314487002-9yb4o",
                "sourcePinId": "pin_F17",
                "targetNodeId": "led-red-1792314867371-l0em9",
                "targetPinId": "cathode",
                "validation": {
                    "isValid": true
                },
                "simulation": {
                    "isActive": false,
                    "traceActive": false
                }
            },
            "style": {
                "strokeWidth": 2,
                "stroke": "#10b981"
            }
        },
        {
            "id": "wire-1792314944532-jtyxck",
            "source": "half-board-1792314487002-9yb4o",
            "sourceHandle": "pin_J17",
            "target": "resistor-1792314936244-yk1md",
            "targetHandle": "pin1",
            "type": "editable",
            "data": {
                "points": null,
                "sourceNodeId": "half-board-1792314487002-9yb4o",
                "sourcePinId": "pin_J17",
                "targetNodeId": "resistor-1792314936244-yk1md",
                "targetPinId": "pin1",
                "validation": {
                    "isValid": true
                },
                "simulation": {
                    "isActive": false,
                    "traceActive": false
                }
            },
            "style": {
                "strokeWidth": 2,
                "stroke": "#10b981"
            }
        },
        {
            "id": "wire-1792314950625-0qjkzh",
            "source": "resistor-1792314936244-yk1md",
            "sourceHandle": "pin2",
            "target": "half-board-1792314487002-9yb4o",
            "targetHandle": "GND-R_8",
            "type": "editable",
            "data": {
                "points": null,
                "sourceNodeId": "resistor-1792314936244-yk1md",
                "sourcePinId": "pin2",
                "targetNodeId": "half-board-1792314487002-9yb4o",
                "targetPinId": "GND-R_8",
                "validation": {
                    "isValid": true
                },
                "simulation": {
                    "isActive": false,
                    "traceActive": false
                }
            },
            "style": {
                "strokeWidth": 2,
                "stroke": "#111827"
            }
        },
        {
            "id": "wire-1792314956625-visxal",
            "source": "half-board-1792314487002-9yb4o",
            "sourceHandle": "VCC-R_1",
            "target": "half-board-1792314487002-9yb4o",
            "targetHandle": "VCC-L_1",
            "type": "editable",
            "data": {
                "points": null,
                "sourceNodeId": "half-board-1792314487002-9yb4o",
                "sourcePinId": "VCC-R_1",
                "targetNodeId": "half-board-1792314487002-9yb4o",
                "targetPinId": "VCC-L_1",
                "validation": {
                    "isValid": true
                },
                "simulation": {
                    "isActive": false,
                    "traceActive": false
                }
            },
            "style": {
                "strokeWidth": 2,
                "stroke": "#ef4444"
            }
        },
        {
            "id": "wire-1792314965550-69rrnm",
            "source": "half-board-1792314487002-9yb4o",
            "sourceHandle": "GND-R_2",
            "target": "half-board-1792314487002-9yb4o",
            "targetHandle": "GND-L_2",
            "type": "editable",
            "data": {
                "points": null,
                "sourceNodeId": "half-board-1792314487002-9yb4o",
                "sourcePinId": "GND-R_2",
                "targetNodeId": "half-board-1792314487002-9yb4o",
                "targetPinId": "GND-L_2",
                "validation": {
                    "isValid": true
                },
                "simulation": {
                    "isActive": false,
                    "traceActive": false
                }
            },
            "style": {
                "strokeWidth": 2,
                "stroke": "#111827"
            }
        }
    ],
    "code": "#include <Wire.h>\n#include <LiquidCrystal_I2C.h>\n\nLiquidCrystal_I2C lcd(0x27, 16, 2);\n\nconst int TRIG_PIN = 6;\nconst int ECHO_PIN = 7;\nconst int BUZZER_PIN = 8;\nconst int LED_PIN = 13;\n\nvoid setup() {\n  pinMode(TRIG_PIN, OUTPUT);\n  pinMode(ECHO_PIN, INPUT);\n  pinMode(BUZZER_PIN, OUTPUT);\n  pinMode(LED_PIN,  OUTPUT);\n  Serial.begin(9600);\n   Wire.begin();\n\n  lcd.init();\n  lcd.backlight();\n\n  lcd.setCursor(0, 0);\n  lcd.print(\"System is  start!\");\n\n  digitalWrite(TRIG_PIN, LOW);\n  digitalWrite(LED_PIN, LOW);\n}\n\nvoid loop() {\n  digitalWrite(TRIG_PIN, LOW);\n  delayMicroseconds(2);\n\n  digitalWrite(TRIG_PIN, HIGH);\n  delayMicroseconds(10);\n  digitalWrite(TRIG_PIN, LOW);\n\n  unsigned long duration =\n    pulseIn(ECHO_PIN, HIGH);\n\n  int distance =\n    duration / 58;\n\n  lcd.setCursor(0, 1);\n  lcd.print(\"Distance:\");\n  lcd.print(distance);\n  if (distance > 0 && distance < 20) {\n    tone(BUZZER_PIN, 1000);\n    digitalWrite(LED_PIN, HIGH);\n  } else {\n    noTone(BUZZER_PIN);\n    digitalWrite(LED_PIN, LOW);\n  }\n\n\n}\n",
    "selectedLibraries": [
        "liquidcrystal-i2c",
        "wire"
    ],
    "viewport": {
        "x": -251.30253008664977,
        "y": 20.51455450582631,
        "zoom": 0.7089177583324672
    },
    "thumbnail": "data:image/jpeg;base64,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"
}
  ]

  return (
    <main className="h-[calc(100vh-65px)] project-scrollbar-width m-0 custom-scrollbar bg-soft text-text-main overflow-auto">
      <header className="sticky top-0 z-20 border-b border-slate-800/80 bg-card/90 px-5 py-4 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate("/circuit")}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-text-secondary bg-text-secondary/20 text-text-main/70 transition hover:border-cyan-500/50 hover:text-secondary"
              title="Back to circuit editor"
            >
              <ArrowLeft size={18} />
            </button>

            <div>
              <h1 className="text-lg font-semibold mb-4">My Projects</h1>
              <p className="text-xs text-text-secondary">
                Saved circuits and Arduino sketches
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={createProject}
            className="flex items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2.5 text-sm font-semibold text-black/90 transition hover:bg-cyan-400"
          >
            <Plus size={17} />
            New Project
          </button>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-5 py-8">
        {projects.length === 0 ? (
          <div className="flex min-h-[55vh] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-800 bg-slate-950/40 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 text-cyan-400">
              <FolderOpen size={30} />
            </div>

            <h2 className="text-base font-semibold">
              No saved projects yet
            </h2>

            <p className="mt-2 max-w-md text-sm text-slate-500">
              Build a circuit, write your Arduino code, then press Save.
              Your project will appear here.
            </p>

            <button
              type="button"
              onClick={createProject}
              className="mt-5 flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-200 hover:border-cyan-500/50 hover:text-cyan-300"
            >
              <CircuitBoard size={17} />
              Start building
            </button>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <article
                key={project.id}
                className="group overflow-hidden rounded-2xl border border-text-secondary/20 bg-card shadow-xl shadow-black/10 transition hover:-translate-y-0.5 hover:border-cyan-500/40"
              >
                <button
                  type="button"
                  onClick={() => openProject(project.id)}
                  className="block w-full text-left"
                >
                  <div className="relative h-40 overflow-hidden border-b border-soft/80 bg-bg">
                    {project.thumbnail ? (
                      <img
                        src={project.thumbnail}
                        alt={project.name + " circuit preview"}
                        loading="lazy"
                        className="h-full w-full object-cover object-center transition duration-300 group-hover:scale-[1.02]"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.08),transparent_60%)]">
                        <CircuitBoard
                          size={48}
                          className="text-cyan-400/70 transition group-hover:scale-105 group-hover:text-cyan-300"
                        />
                      </div>
                    )}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-linear-to-t from-black/20 to-transparent" />
                  </div>

                  <div className="p-4 bg-card">
                    <h2 className="truncate text-sm font-semibold text-text-main">
                      {project.name}
                    </h2>

                    <div className="mt-3 flex items-center gap-4 text-xs text-text-secondary">
                      <span>{project.nodes.length} components</span>
                      <span>{project.edges.length} wires</span>
                    </div>

                    <div className="mt-2 flex items-center gap-1.5 text-[11px] text-text-secondary/90">
                      <Clock3 size={12} />
                      {formatDate(project.updatedAt)}
                    </div>
                  </div>
                </button>

                <div className="border-t border-text-secondary/20 px-4 py-3">
                  <button
                    type="button"
                    onClick={() => removeProject(project.id)}
                    className="flex items-center gap-1.5 text-xs text-error/80 transition hover:text-error"
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
      <section className="mx-auto max-w-6xl px-5 py-8 border-t-2 border-text-secondary">
        <h1 className="text-center font-bold text-text-main text-xl lg:text-2xl mt-4">Build In Projects</h1>
        <p className="text-center text-2xl lg:text-4xl mb-12 font-extrabold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">✦•┈๑⋅⋯ ⋯⋅๑┈•✦</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {buildInProjects.map((project) => (
              <article
                key={project.id}
                className="group overflow-hidden rounded-2xl border border-secondary/20 bg-card shadow-xl shadow-black/10 transition hover:-translate-y-0.5 hover:border-cyan-500/40"
              >
                <button
                  type="button"
                  onClick={() => openProject(project.id)}
                  className="block w-full text-left"
                >
                  <div className="relative h-40 overflow-hidden border-b border-soft/80 bg-bg">
                    {project.thumbnail ? (
                      <img
                        src={project.thumbnail}
                        alt={project.name + " circuit preview"}
                        loading="lazy"
                        className="h-full w-full object-cover object-center transition duration-300 group-hover:scale-[1.02]"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.08),transparent_60%)]">
                        <CircuitBoard
                          size={48}
                          className="text-cyan-400/70 transition group-hover:scale-105 group-hover:text-cyan-300"
                        />
                      </div>
                    )}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-linear-to-t from-black/30 to-transparent" />
                  </div>

                  <div className="p-4 bg-card">
                    <h2 className="truncate text-sm font-semibold text-text-main">
                      {project.name}
                    </h2>

                    <div className="mt-3 flex items-center gap-4 text-xs text-text-secondary">
                      <span>{project.nodes.length} components</span>
                      <span>{project.edges.length} wires</span>
                    </div>

                    <div className="mt-2 flex items-center gap-1.5 text-[11px] text-text-secondary/90">
                      <Clock3 size={12} />
                      {formatDate(project.updatedAt)}
                    </div>
                  </div>
                </button>

                <div className="border-t border-text-secondary/20 px-4 py-3">
                  <button
                    type="button"
                    onClick={() => removeProject(project.id)}
                    className="flex items-center gap-1.5 text-xs text-error/80 transition hover:text-error"
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
      </section>
    </main>
  );
}
