export interface TemplateItem {
    Stage: string;
    Thumbnail: string;
}

const template1: string = `{
  "attrs": {
    "width": 1080,
    "height": 1920
  },
  "className": "Stage",
  "children": [
    {
      "attrs": {
        "id": "background-layer"
      },
      "className": "Layer",
      "children": [
        {
          "attrs": {
            "id": "background-rect",
            "width": 1080,
            "height": 1920,
            "fill": "lightblue"
          },
          "className": "Rect"
        }
      ]
    },
    {
      "attrs": {
        "id": "shapes-layer"
      },
      "className": "Layer",
      "children": [
        {
          "attrs": {
            "x": 103.99999999999989,
            "y": 97.00000000000001,
            "width": 50,
            "height": 50,
            "fill": "red",
            "draggable": true,
            "scaleX": 4.2951135025747575,
            "scaleY": 4.2951135025747575
          },
          "className": "Rect"
        },
        {
          "attrs": {
            "x": 813.9609448332023,
            "y": 171.96094483320206,
            "radius": 70,
            "fill": "blue",
            "draggable": true,
            "scaleX": 1.486272216668542,
            "scaleY": 1.4862722166685411
          },
          "className": "Circle"
        },
        {
          "attrs": {
            "points": [
              50,
              50,
              200,
              50
            ],
            "stroke": "yellow",
            "hitStrokeWidth": 20,
            "draggable": true,
            "x": -87.32236842105272,
            "y": 715.0000000000026,
            "scaleX": 5.006578947368424,
            "scaleY": 1.0000000000000064
          },
          "className": "Line"
        },
        {
          "attrs": {
            "id": "transformer",
            "enabledAnchors": [
              "middle-left",
              "middle-right"
            ],
            "x": 156,
            "y": 759.000000000003
          },
          "className": "Transformer"
        }
      ]
    }
  ]
}`;

const template2: string = `{
  "attrs": {
    "width": 1080,
    "height": 1920
  },
  "className": "Stage",
  "children": [
    {
      "attrs": {
        "id": "background-layer"
      },
      "className": "Layer",
      "children": [
        {
          "attrs": {
            "id": "background-rect",
            "width": 1080,
            "height": 1920,
            "fill": "lightblue"
          },
          "className": "Rect"
        }
      ]
    },
    {
      "attrs": {
        "id": "shapes-layer"
      },
      "className": "Layer",
      "children": [
        {
          "attrs": {
            "x": 131.9999999999999,
            "y": 247,
            "width": 50,
            "height": 50,
            "fill": "red",
            "draggable": true,
            "scaleX": 4.2951135025747575,
            "scaleY": 4.2951135025747575
          },
          "className": "Rect"
        },
        {
          "attrs": {
            "x": 839.9609448332023,
            "y": 286.96094483320206,
            "radius": 70,
            "fill": "blue",
            "draggable": true,
            "scaleX": 1.486272216668542,
            "scaleY": 1.4862722166685411
          },
          "className": "Circle"
        },
        {
          "attrs": {
            "points": [
              50,
              50,
              200,
              50
            ],
            "stroke": "yellow",
            "hitStrokeWidth": 20,
            "draggable": true,
            "x": 237.01224165586933,
            "y": 969.035289607868,
            "scaleX": 5.006578947368421,
            "scaleY": 1.000000000000006,
            "rotation": -64.08416499755421,
            "skewX": -2.261878813901225e-15
          },
          "className": "Line"
        },
        {
          "attrs": {
            "x": 100.39412331238101,
            "y": 71.21260779847228,
            "text": "Simple Text",
            "fontSize": 30,
            "fontFamily": "Alegreya",
            "fill": "#0000FF",
            "align": "center",
            "draggable": true,
            "rotation": 0.535458985557579,
            "skewX": 2.463417477060138e-16,
            "width": 209.0095639357041,
            "height": 30.000000000000316
          },
          "className": "Text"
        },
        {
          "attrs": {
            "x": 361,
            "y": 63,
            "text": "Simple Text",
            "fontSize": 30,
            "fontFamily": "Alfa Slab One",
            "fill": "#0000FF",
            "align": "center",
            "draggable": true
          },
          "className": "Text"
        },
        {
          "attrs": {
            "x": 369.9999999999999,
            "y": 175.99999999999966,
            "text": "Simple Text",
            "fontSize": 30,
            "fontFamily": "Alex Brush",
            "fill": "#0000FF",
            "align": "center",
            "draggable": true,
            "width": 259.4541732316185,
            "height": 60.047253206932005
          },
          "className": "Text"
        },
        {
          "attrs": {
            "id": "transformer",
            "enabledAnchors": [
              "middle-left",
              "middle-right"
            ],
            "x": 382.30289144447346,
            "y": 776.7987374035683
          },
          "className": "Transformer"
        }
      ]
    }
  ]
}`;

export const testTemplates: Array<TemplateItem> = [
    {
        Stage: template1,
        Thumbnail: 'Thumbnail1'
    },
    {
        Stage: template2,
        Thumbnail: 'Template with text'
    }
];
