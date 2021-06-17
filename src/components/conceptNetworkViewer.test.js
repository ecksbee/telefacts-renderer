import { render, screen, waitFor } from '@testing-library/react';
import ConceptNetworkViewer from './conceptNetworkViewer';

test('clicking the entity dropdown displays list of options', () => {
    render(<ConceptNetworkViewer />);
    expect(screen.getByText("Presentation")).toBeTruthy();
    expect(screen.getByText("Definition")).toBeTruthy();
    expect(screen.getByText("Calculation")).toBeTruthy();
  });