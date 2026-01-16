export interface TemplateItem {
    Name: string;
    Stage: string;
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

const template3: string = `{
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
            "fill": "white"
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
            "x": 801,
            "y": 63,
            "text": "Report",
            "fontSize": 30,
            "fontFamily": "Alef",
            "fill": "#000000",
            "align": "center",
            "draggable": true
          },
          "className": "Text"
        },
        {
          "attrs": {
            "x": 46,
            "y": 201,
            "text": "Your Name",
            "fontSize": 30,
            "fontFamily": "Alef",
            "fill": "#000000",
            "align": "center",
            "draggable": true
          },
          "className": "Text"
        },
        {
          "attrs": {
            "x": 46,
            "y": 154,
            "text": "Company Name",
            "fontSize": 30,
            "fontFamily": "Alef",
            "fill": "#000000",
            "align": "center",
            "draggable": true
          },
          "className": "Text"
        },
        {
          "attrs": {
            "x": 47,
            "y": 237,
            "text": "City, State Zip",
            "fontSize": 30,
            "fontFamily": "Alef",
            "fill": "#000000",
            "align": "center",
            "draggable": true
          },
          "className": "Text"
        },
        {
          "attrs": {
            "x": 51,
            "y": 282,
            "text": "Country",
            "fontSize": 30,
            "fontFamily": "Alef",
            "fill": "#000000",
            "align": "center",
            "draggable": true
          },
          "className": "Text"
        },
        {
          "attrs": {
            "x": 7.999999999999992,
            "y": 360.9999999999982,
            "width": 50,
            "height": 50,
            "fill": "#737373",
            "draggable": true,
            "scaleX": 21.3,
            "scaleY": 0.9999999999999974
          },
          "className": "Rect"
        },
        {
          "attrs": {
            "x": 27,
            "y": 372,
            "text": "Images",
            "fontSize": 30,
            "fontFamily": "Alef",
            "fill": "#D9D9D9",
            "align": "center",
            "draggable": true
          },
          "className": "Text"
        },
        {
          "attrs": {
            "x": 6.99999999999999,
            "y": 899.9999999999978,
            "width": 50,
            "height": 50,
            "fill": "#737373",
            "draggable": true,
            "scaleX": 21.33999999999999,
            "scaleY": 0.9999999999999946
          },
          "className": "Rect"
        },
        {
          "attrs": {
            "x": 26,
            "y": 910,
            "text": "DICOM Tags",
            "fontSize": 30,
            "fontFamily": "Alef",
            "fill": "#D9D9D9",
            "align": "center",
            "draggable": true
          },
          "className": "Text"
        },
        {
          "attrs": {
            "x": 8.999999999999979,
            "y": 1408.9999999999918,
            "width": 50,
            "height": 50,
            "fill": "#737373",
            "draggable": true,
            "scaleX": 21.28,
            "scaleY": 0.999999999999997
          },
          "className": "Rect"
        },
        {
          "attrs": {
            "x": 23,
            "y": 1418,
            "text": "NOTES",
            "fontSize": 30,
            "fontFamily": "Alef",
            "fill": "#D9D9D9",
            "align": "center",
            "draggable": true
          },
          "className": "Text"
        },
        {
          "attrs": {
            "id": "transformer",
            "enabledAnchors": [
              "top-left",
              "top-right",
              "middle-right",
              "middle-left",
              "bottom-left",
              "bottom-right"
            ],
            "visible": false,
            "x": 28,
            "y": 1413
          },
          "className": "Transformer"
        }
      ]
    }
  ]
}`;

export const testTemplates: Array<TemplateItem> = [
    {
        Name: 'Example DICOM Report',
        Stage: template3
    },
    {
        Name: 'Example 1',
        Stage: template1
    },
    {
        Name: 'Example 2',
        Stage: template2
    }
];
