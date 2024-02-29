"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopologyPipelinesGettingStartedDemo = exports.PipelineTasks = void 0;
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
            hash: 'spaghet1234'
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
var DemoTaskNode = function (_a) {
    var element = _a.element;
    var data = element.getData();
    return (React.createElement(react_topology_1.TaskNode, { element: element, status: data === null || data === void 0 ? void 0 : data.status, toolTip: JSON.stringify(data) }));
};
var pipelineComponentFactory = function (kind, type) {
    if (kind === react_topology_1.ModelKind.graph) {
        return react_topology_1.GraphComponent;
    }
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
        case react_topology_1.ModelKind.edge:
            return react_topology_1.DefaultEdge;
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
var TopologyPipelinesGettingStartedDemo = function (_a) {
    var nodeModel = _a.nodeModel;
    var _b = (0, pipeline_to_node_and_edge_1.buildNodeAndEdgeModels)({ pipelineNodes: nodeModel ? nodeModel : TASK_NODES }), nodes = _b.nodes, edges = _b.edges;
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
        React.createElement("div", { style: { width: '100vh', height: '100vw' } },
            " ",
            React.createElement(react_topology_1.VisualizationSurface, null))));
};
exports.TopologyPipelinesGettingStartedDemo = TopologyPipelinesGettingStartedDemo;
//
// const container = document.getElementById("root");
// createRoot(container).render(<TopologyPipelinesGettingStartedDemo />);
