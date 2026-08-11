import { sections } from '../examples/registry';
import { ExampleCard, Section } from '../examples/ExampleCard';

export default function Examples() {
  return (
    <div className="space-y-12">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">Examples</h1>
        <p className="text-lg text-gray-500">
          Live, working examples grouped by category. Expand the code to copy it.
        </p>
      </div>

      {sections.map((section) => (
        <Section key={section.title} title={section.title}>
          {section.examples.map((ex) => (
            <ExampleCard
              key={ex.id}
              title={ex.title}
              description={ex.description}
              code={ex.code}
              source={ex.source}>
              <ex.Component />
            </ExampleCard>
          ))}
        </Section>
      ))}
    </div>
  );
}
