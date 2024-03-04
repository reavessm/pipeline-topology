"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopologyPipelinesGettingStartedDemo = exports.PipelineTasks = void 0;
var client_1 = require("react-dom/client");
require("@patternfly/react-core/dist/styles/base.css");
require("./fonts.css");
require("./pipeline-styles.css");
var pipeline_to_node_and_edge_1 = require("./pipeline-to-node-and-edge");
require("@patternfly/react-topology/patternfly-docs/content/examples/./topology-pipelines-example.css");
var React = require("react");
var react_topology_1 = require("@patternfly/react-topology");
// PIPELINE NODE MODEL APPROACH
var TASK_NODES = [
    {
        id: 'int',
        type: 'DEFAULT_TASK_NODE',
        label: 'int',
        width: 180,
        height: 32,
        style: {
            padding: [45, 15]
        }
    },
    {
        id: 'int-test-1',
        type: 'DEFAULT_TASK_NODE',
        label: 'int test 1',
        width: 180,
        height: 32,
        style: {
            padding: [45, 15]
        },
        runAfterTasks: ['int'],
        data: {
            status: react_topology_1.RunStatus.Succeeded,
            gating: true,
            hash: 'spaghet1234' // TODO: see if i can make edges less ugly?
        }
    },
    {
        id: 'int-test-2',
        type: 'DEFAULT_TASK_NODE',
        label: 'int test 2',
        width: 180,
        height: 32,
        style: {
            padding: [45, 15]
        },
        runAfterTasks: ['int'],
        data: {
            status: react_topology_1.RunStatus.Succeeded,
            gating: false,
            hash: 'spaghet2345'
        }
    },
    {
        id: 'stage',
        type: 'DEFAULT_TASK_NODE',
        label: 'stage',
        width: 180,
        height: 32,
        style: {
            padding: [45, 15]
        },
        runAfterTasks: ['int', 'int-test-1', 'int-test-2'],
        data: {
            status: react_topology_1.RunStatus.Succeeded,
            gating: true,
            hash: 'spaghet3456'
        }
    },
    {
        id: 'finally-0',
        type: 'DEFAULT_FINALLY_NODE',
        label: 'Finally task 0',
        width: 156,
        height: 32,
        runAfterTasks: ['stage'],
        style: {
            paddingLeft: 24
        }
    },
    {
        id: 'finally-1',
        type: 'DEFAULT_FINALLY_NODE',
        label: 'Finally task 1',
        width: 156,
        height: 32,
        runAfterTasks: ['stage'],
        style: {
            paddingLeft: 24
        }
    }
];
var DataEdge = function (_a) {
    var element = _a.element, rest = __rest(_a, ["element"]);
    return (React.createElement(react_topology_1.DefaultEdge, __assign({ element: element, endTerminalType: react_topology_1.EdgeTerminalType.none }, rest)));
};
var DemoTaskNode = function (_a) {
    var element = _a.element;
    var data = element.getData();
    return (React.createElement(react_topology_1.TaskNode, { element: element, status: data === null || data === void 0 ? void 0 : data.status, toolTip: JSON.stringify(data) }));
};
var pipelineComponentFactory = function (kind, type) {
    if (kind === react_topology_1.ModelKind.graph) {
        return react_topology_1.GraphComponent;
    }
    console.log("kind: ".concat(kind, " \ntype: ").concat(type));
    switch (type) {
        case react_topology_1.DEFAULT_TASK_NODE_TYPE:
            return DemoTaskNode; // TODO: as far as I can assume all nodes should be this type <-
        case react_topology_1.DEFAULT_FINALLY_NODE_TYPE:
            return react_topology_1.FinallyNode;
        case 'task-group':
            return react_topology_1.DefaultTaskGroup;
        case 'finally-group':
            return react_topology_1.DefaultTaskGroup;
        case react_topology_1.DEFAULT_SPACER_NODE_TYPE:
            return react_topology_1.SpacerNode;
        case 'finally-spacer-edge':
        case react_topology_1.DEFAULT_EDGE_TYPE:
            return react_topology_1.TaskEdge;
        case 'data-edge':
            return DataEdge;
        case react_topology_1.ModelKind.edge:
            return DataEdge;
        default:
            return undefined;
    }
};
var PipelineTasks = function () {
    var controller = (0, react_topology_1.useVisualizationController)();
    React.useEffect(function () {
        controller.fromModel({
            graph: {
                id: 'g1',
                type: 'graph'
            },
            nodes: TASK_NODES
        }, false);
    }, [controller]);
    return (React.createElement(react_topology_1.TopologyView, null,
        React.createElement(react_topology_1.VisualizationSurface, null)));
};
exports.PipelineTasks = PipelineTasks;
exports.PipelineTasks.displayName = 'PipelineTasks';
// interface TopologyProps {
//     nodeModel: PipelineNodeModel[];
// }
var TopologyPipelinesGettingStartedDemo = function (_a) {
    var _b = (0, pipeline_to_node_and_edge_1.buildNodeAndEdgeModels)({ pipelineNodes: TASK_NODES }), nodes = _b.nodes, edges = _b.edges;
    var controller = new react_topology_1.Visualization();
    controller.setFitToScreenOnLayout(true);
    controller.registerComponentFactory(pipelineComponentFactory);
    controller.registerLayoutFactory(function (_type, graph) { return new react_topology_1.PipelineDagreLayout(graph); });
    var model = {
        nodes: nodes,
        edges: edges,
        graph: {
            id: 'g1',
            type: 'graph',
            layout: 'pipelineLayout'
        }
    };
    controller.fromModel(model, false);
    return (React.createElement(react_topology_1.VisualizationProvider, { controller: controller },
        React.createElement(react_topology_1.VisualizationSurface, null)));
};
exports.TopologyPipelinesGettingStartedDemo = TopologyPipelinesGettingStartedDemo;
// Uncomment this to run standalone
var container = document.getElementById("root");
(0, client_1.createRoot)(container).render(React.createElement(exports.TopologyPipelinesGettingStartedDemo, null));
