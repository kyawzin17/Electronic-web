
import type { Edge, Node } from "reactflow";

/**
 * Built-in projects are bundled with the website.
 * They are separate from user projects in localStorage.
 *
 * Replace the empty nodes and edges with actual circuit data
 * from your simulator's saved project JSON.
 */

export type BuiltInProject = {
  id: string;
  name: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  thumbnail?: string;
  nodes: Node[];
  edges: Edge[];
  code: string;
  selectedLibraries: string[];
  viewport?: {
    x: number;
    y: number;
    zoom: number;
  };
};

export const BUILT_IN_PROJECT_LIMIT = 3;

export const builtInProjects: BuiltInProject[] = [
  {
    id: "builtin-led-blink",
    name: "LED Blink",
    description:
      "Build your first Arduino circuit and make an LED blink.",
    difficulty: "Beginner",
    thumbnail: "/projects/led-blink.webp",

    // TODO: Add the actual saved circuit nodes.
    nodes: [],

    // TODO: Add the actual saved wire connections.
    edges: [],

    code: `const int ledPin = 13;

void setup() {
  pinMode(ledPin, OUTPUT);
}

void loop() {
  digitalWrite(ledPin, HIGH);
  delay(1000);
  digitalWrite(ledPin, LOW);
  delay(1000);
}`,
    selectedLibraries: [],
    viewport: {
      x: 0,
      y: 0,
      zoom: 1,
    },
  },

  {
    id: "builtin-ultrasonic-alert",
    name: "Ultrasonic Distance Alert",
    description:
      "Measure distance using an HC-SR04 sensor and control a buzzer.",
    difficulty: "Beginner",
    thumbnail: "/projects/ultrasonic-alert.webp",

    // TODO: Add actual HC-SR04, Arduino and buzzer nodes.
    nodes: [],

    // TODO: Add the actual pin-to-pin wire connections.
    edges: [],

    code: `const int trigPin = 9;
const int echoPin = 10;
const int buzzerPin = 8;

void setup() {
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  pinMode(buzzerPin, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);

  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  long duration = pulseIn(echoPin, HIGH);
  float distance = duration * 0.0343 / 2;

  if (distance > 0 && distance < 20) {
    tone(buzzerPin, 1000);
  } else {
    noTone(buzzerPin);
  }

  Serial.println(distance);
  delay(100);
}`,
    selectedLibraries: [],
    viewport: {
      x: 0,
      y: 0,
      zoom: 1,
    },
  },

  {
    id: "builtin-lcd-message",
    name: "LCD Message Display",
    description:
      "Display a custom message on an LCD1602 using Arduino.",
    difficulty: "Intermediate",
    thumbnail: "/projects/lcd-message.webp",

    // TODO: Add Arduino and LCD1602 nodes.
    nodes: [],

    // TODO: Add the actual LCD pin connections.
    edges: [],

    // Example uses the I2C LCD library already supported by
    // your simulator. Verify the configured I2C address.
    code: `#include <LiquidCrystal_I2C.h>

LiquidCrystal_I2C lcd(0x27, 16, 2);

void setup() {
  lcd.init();
  lcd.backlight();

  lcd.setCursor(0, 0);
  lcd.print("Hello Myanmar!");
  lcd.setCursor(0, 1);
  lcd.print("Red Dragon");
}

void loop() {
}`,
    selectedLibraries: ["LiquidCrystal_I2C"],
    viewport: {
      x: 0,
      y: 0,
      zoom: 1,
    },
  },
];
