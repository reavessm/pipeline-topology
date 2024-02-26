"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.TopologyPipelinesGettingStartedDemo = exports.PipelineTasks = void 0;
var React = require("react");
var react_topology_1 = require("@patternfly/react-topology");
require("./topology-example.css");
var TASK_NODES = [
    {
        id: 'task-undefined',
        type: 'DEFAULT_TASK_NODE',
        label: 'No status Task',
        width: 180,
        height: 32,
        style: {
            padding: [45, 15]
        }
    },
    {
        id: 'task-Succeeded',
        type: 'DEFAULT_TASK_NODE',
        label: 'Succeeded Task',
        width: 180,
        height: 32,
        style: {
            padding: [45, 15]
        },
        runAfterTasks: ['task-undefined'],
        data: {
            status: react_topology_1.RunStatus.Succeeded
        }
    },
    {
        id: 'finally-0',
        type: 'DEFAULT_FINALLY_NODE',
        label: 'Finally task 0',
        width: 156,
        height: 32,
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
        style: {
            paddingLeft: 24
        }
    }
];
var DemoTaskNode = function (_a) {
    var element = _a.element;
    var data = element.getData();
    var whenDecorator = (data === null || data === void 0 ? void 0 : data.whenStatus) ? (React.createElement(react_topology_1.WhenDecorator, { element: element, status: data.whenStatus, leftOffset: react_topology_1.DEFAULT_WHEN_OFFSET })) : null;
    return (React.createElement(react_topology_1.TaskNode, { element: element, status: data === null || data === void 0 ? void 0 : data.status }, whenDecorator));
};
var pipelineComponentFactory = function (kind, type) {
    if (kind === react_topology_1.ModelKind.graph) {
        return react_topology_1.GraphComponent;
    }
    switch (type) {
        case react_topology_1.DEFAULT_TASK_NODE_TYPE:
            return DemoTaskNode;
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
var TopologyPipelinesGettingStartedDemo = function () {
    var controller = new react_topology_1.Visualization();
    controller.setFitToScreenOnLayout(true);
    controller.registerComponentFactory(pipelineComponentFactory);
    controller.registerLayoutFactory(function (type, graph) { return new react_topology_1.PipelineDagreLayout(graph); });
    var spacerNodes = (0, react_topology_1.getSpacerNodes)(TASK_NODES);
    var nodes = __spreadArray(__spreadArray([], TASK_NODES, true), spacerNodes, true);
    var edges = (0, react_topology_1.getEdgesFromNodes)(nodes);
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
