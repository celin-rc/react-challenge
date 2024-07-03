import React from 'react';
import { withJsonFormsControlProps } from '@jsonforms/react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Box } from '@mui/material';

const continents = {
  "Europe": ["Belgique", "France", "Allemagne", "Italie", "Espagne"],
  "Afrique": ["Nigéria", "Afrique du Sud", "Kenya", "Égypte"]
};

const CustomCountrySelector = ({ data, handleChange, path }) => {
  const [selectedCountries, setSelectedCountries] = React.useState(data || []);

  const handleCountryChange = (event, value) => {
    setSelectedCountries(value);
    handleChange(path, value);
  };

  const handleContinentChange = (continent) => {
    const countries = continents[continent];
    const isSelected = countries.every(country => selectedCountries.includes(country));

    const newSelectedCountries = isSelected
      ? selectedCountries.filter(country => !countries.includes(country))
      : [...new Set([...selectedCountries, ...countries])];

    setSelectedCountries(newSelectedCountries);
    handleChange(path, newSelectedCountries);
  };

  return (
    <Box>
      {Object.keys(continents).map(continent => (
        <FormControlLabel
          key={continent}
          control={
            <Checkbox
              checked={continents[continent].every(country => selectedCountries.includes(country))}
              onChange={() => handleContinentChange(continent)}
            />
          }
          label={continent}
        />
      ))}
      <Autocomplete
        multiple
        options={[].concat(...Object.values(continents))}
        value={selectedCountries}
        onChange={handleCountryChange}
        renderInput={(params) => (
          <TextField {...params} variant="standard" label="Pays visités" />
        )}
      />
    </Box>
  );
};

export default withJsonFormsControlProps(CustomCountrySelector);
