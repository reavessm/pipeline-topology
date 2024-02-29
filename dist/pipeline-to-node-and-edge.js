"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildNodeAndEdgeModels = void 0;
// import * as React from 'react';
var react_topology_1 = require("@patternfly/react-topology");
var buildNodeAndEdgeModels = function (_a) {
    var pipelineNodes = _a.pipelineNodes;
    var nodes = [];
    var edges = [];
    // Iterate through each PipelineNodeModel
    pipelineNodes.forEach(function (pipelineNode) {
        // Create a NodeModel based on the PipelineNodeModel
        var node = {
            id: pipelineNode.id,
            type: 'DEFAULT_TASK_NODE',
            label: pipelineNode.label,
            data: pipelineNode.data,
        };
        nodes.push(node);
        // Create edges if there are runAfterTasks
        if (pipelineNode.runAfterTasks && pipelineNode.runAfterTasks.length > 0) {
            pipelineNode.runAfterTasks.forEach(function (taskId) {
                var _a;
                // Find the source node
                var targetNode = pipelineNodes.find(function (node) { return node.id === taskId; });
                // Determine the edgeStyle based on the gating status of the source node
                var edgeStyle = ((_a = targetNode === null || targetNode === void 0 ? void 0 : targetNode.data) === null || _a === void 0 ? void 0 : _a.gating) ? react_topology_1.EdgeStyle.dotted : react_topology_1.EdgeStyle.default;
                // Create an EdgeModel for each runAfterTask
                var edge = {
                    id: "".concat(taskId, "-").concat(pipelineNode.id),
                    type: 'edge',
                    source: taskId,
                    target: pipelineNode.id,
                    edgeStyle: edgeStyle,
                };
                edges.push(edge);
            });
        }
    });
    return { nodes: nodes, edges: edges };
};
exports.buildNodeAndEdgeModels = buildNodeAndEdgeModels;
