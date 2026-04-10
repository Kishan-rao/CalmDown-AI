import { Panel } from './Panel';

interface SupportResponseProps {
  response: string;
}

export function SupportResponse({ response }: SupportResponseProps) {
  return (
    <Panel className="support-panel">
      <div className="panel-header">
        <div>
          <p className="section-label">Step 5</p>
          <h3>Support Response</h3>
        </div>
      </div>

      <div className="support-response">
        <p>{response}</p>
      </div>

      <div className="disclaimer">
        <strong>Responsible AI note</strong>
        <p>
          This prototype is for emotional support and early awareness, not medical diagnosis. If
          a user appears at risk, the product should clearly encourage professional or emergency
          help pathways.
        </p>
      </div>
    </Panel>
  );
}
