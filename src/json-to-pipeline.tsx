import { PipelineNodeModel, NodeModel } from '@patternfly/react-topology'

interface NestedDict {
    [key: string]: { [key: string]: string };
}

const width = 555;
const height = 32;
const padding = [45, 15];

export const buildPipelineNodelModel = (service: string, configMap: string,
    scale: number) => {
    const dict: NestedDict = JSON.parse(configMap);
    const pipelineNodeModel : PipelineNodeModel[] = [];
    for (const key in dict) {
        if (key.startsWith(service)) {
            const keyStr = key.split("/")
            const pipelineNode : NodeModel = {
                id: key,
                type: 'DEFAULT_TASK_NODE',
                label: `${keyStr[keyStr.length-1]} ${keyStr[keyStr.length-2]}`,
                width: width,
                height: height,
                data: {
                    status: dict[key]["deployment_state"],
                    hash: dict[key]["commit_sha"]
                },
                // runAfterTasks: dict[key][runAfter] TODO: runAfterTasks
                style: {
                    padding: padding,
                    scale: scale
                }
            }
            pipelineNodeModel.push(pipelineNode);
        }
    }
    return pipelineNodeModel;
}
