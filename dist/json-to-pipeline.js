"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildPipelineNodelModel = void 0;
var width = 180;
var height = 32;
var padding = [45, 15];
var buildPipelineNodelModel = function (service, configMap) {
    var dict = JSON.parse(configMap);
    var pipelineNodeModel = [];
    for (var key in dict) {
        if (key.startsWith(service)) {
            var pipelineNode = {
                id: key,
                type: 'DEFAULT_TASK_NODE',
                label: key,
                width: width,
                height: height,
                data: {
                    status: dict[key]["deployment_state"],
                    hash: dict[key]["commit_sha"]
                },
                // runAfterTasks: dict[key][runAfter] TODO: runAfterTasks
                style: {
                    padding: padding
                }
            };
            pipelineNodeModel.push(pipelineNode);
        }
    }
    return pipelineNodeModel;
};
exports.buildPipelineNodelModel = buildPipelineNodelModel;
