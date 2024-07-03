import React from 'react';
import { JsonForms } from '@jsonforms/react';
import { materialRenderers, materialCells } from '@jsonforms/material-renderers';
import schema from './schema.json';
import uischema from './uischema.json';
import CustomCountrySelector from './CustomCountrySelector';
import { rankWith, isControl } from '@jsonforms/core';

const customRenderers = [
  ...materialRenderers,
  {
    tester: rankWith(3, isControl),
    renderer: CustomCountrySelector
  }
];

const initialData = {
  name: '',
  visitedCountries: ["Belgique", "Nigéria"]
};

const App = () => {
  const [data, setData] = React.useState(initialData);

  return (
    <div>
      <h1>Formulaire de Visite des Pays</h1>
      <JsonForms
        schema={schema}
        uischema={uischema}
        data={data}
        renderers={customRenderers}
        cells={materialCells}
        onChange={({ data }) => setData(data)}
      />
    </div>
  );
};

export default App;
