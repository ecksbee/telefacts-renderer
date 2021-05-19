import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import Selectize from './selectize';
import './selectizeBox.css';

  test('clicking the entity dropdown displays list of options', async () => {
    const testArray = [
      {label:'testLabel_1', key: 'testKey_1'},
      {label:'testLabel_2', key: 'testKey_2'},
      {label:'testLabel_3', key: 'testKey_3'}
    ];
    render(<Selectize onChange={_=>{}} selected={null} options={testArray} />);
    userEvent.hover(screen.getByText('Select...'));
    userEvent.click(screen.getByText('Select...'));
    await waitFor(()=>screen.getByText('testLabel_1'));

    testArray.forEach(item => expect(screen.getByText(item.label)).toBeTruthy());
  });
