import PipelineNodeModel from '@patternfly/react-topology'

interface NestedDict {
    [key: string]: { [key: string]: string };
}

const width = 180;
const height = 32;
const padding = [45, 15];

export const buildPipelineNodelModel = (service: string, configMap: string) => {
    const dict: NestedDict = JSON.parse(configMap);
    const pipelineNodeModel = [];
    for (const key in dict) {
        if (key.startsWith(service)) {
            const pipelineNode = {
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
            }
            pipelineNodeModel.push(pipelineNode);
        }
    }
    return pipelineNodeModel;
}
