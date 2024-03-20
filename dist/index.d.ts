import "@patternfly/react-core/dist/styles/base.css";
import './fonts.css';
import './pipeline-styles.css';
import '@patternfly/react-topology/patternfly-docs/content/examples/./topology-pipelines-example.css';
import * as React from 'react';
export declare const PipelineTasks: React.FC;
interface TopologyProps {
    name: string;
    nodeJSON: string;
    scale: number;
}
export declare const TopologyPipelinesGettingStartedDemo: React.FunctionComponent<TopologyProps>;
export {};
