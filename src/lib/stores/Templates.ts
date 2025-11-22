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

export const testTemplates: Array<TemplateItem> = [
    {
        Stage: template1,
        Thumbnail: 'Thumbnail1'
    }
];
