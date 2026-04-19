const y= 480;
export const LCD1602_PIN= [
          { name: 'VSS', x: 32, y: 300, dir: 'bottom', number: 1, signals: [{ type: 'power', signal: 'GND' }] },
          { name: 'VDD', x: 41.5, y: y, dir: 'bottom', number: 2, signals: [{ type: 'power', signal: 'VCC' }] },
          { name: 'V0', x: 51.5, y: y, dir: 'bottom', number: 3, signals: [] },
          { name: 'RS', x: 60.5, y: y, dir: 'bottom', number: 4, signals: [] },
          { name: 'RW', x: 70.5, y: y, dir: 'bottom', number: 5, signals: [] },
          { name: 'E', x: 80, y: y, dir: 'bottom', number: 6, signals: [] },
          { name: 'D0', x: 89.5, y: y, dir: 'bottom', number: 7, signals: [] },
          { name: 'D1', x: 99.5, y: y, dir: 'bottom', number: 8, signals: [] },
          { name: 'D2', x: 109, y: y, dir: 'bottom', number: 9, signals: [] },
          { name: 'D3', x: 118.5, y: y, dir: 'bottom', number: 10, signals: [] },
          { name: 'D4', x: 128, y: y, dir: 'bottom', number: 11, signals: [] },
          { name: 'D5', x: 137.5, y: y, dir: 'bottom', number: 12, signals: [] },
          { name: 'D6', x: 147, y: y, dir: 'bottom', number: 13, signals: [] },
          { name: 'D7', x: 156.5, y: y, dir: 'bottom', number: 14, signals: [] },
          { name: 'A', x: 166.5, y: y, dir: 'bottom', number: 15, signals: [] },
          { name: 'K', x: 176, y: y, dir: 'bottom', number: 16, signals: [] },
        ]