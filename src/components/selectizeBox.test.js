import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import SelectizeBox from './selectizeBox';
import './selectizeBox.css';

  test('clicking the entity dropdown displays list of options', async () => {
    const testArray = [
      {label:'testLabel_1', key: 'testKey_1'},
      {label:'testLabel_2', key: 'testKey_2'},
      {label:'testLabel_3', key: 'testKey_3'}
    ];
    render(<SelectizeBox onEntityChange={_=>{}}
    onRSetChange={_=>{}}
    entitySelected={null}
    entityOptions={testArray}
    rSetSelected={null}
    rSetOptions={[]} />);

    userEvent.hover(screen.getByLabelText('Entity:'));
    userEvent.click(screen.getByLabelText('Entity:'));
    await waitFor(()=>screen.getByText('testLabel_1'));

    testArray.forEach(item => expect(screen.getByText(item.label)).toBeTruthy());
  });

  test('clicking the relationship set dropdown displays list of options', async () => {
    const testArray = [
      {label:'testLabel_1', key: 'testKey_1'},
      {label:'testLabel_2', key: 'testKey_2'},
      {label:'testLabel_3', key: 'testKey_3'}
    ];
    render(<SelectizeBox onEntityChange={_=>{}}
    onRSetChange={_=>{}}
    entitySelected={null}
    entityOptions={[]}
    rSetSelected={null}
    rSetOptions={testArray} />);

    userEvent.hover(screen.getByLabelText('Relationship Set:'));
    userEvent.click(screen.getByLabelText('Relationship Set:'));
    await waitFor(()=>screen.getByText('testLabel_1'));

    testArray.forEach(item => expect(screen.getByText(item.label)).toBeTruthy());
  });

  test('clicking an entity dropdown option invokes state change', async () => {
    const testArray = [
      {label:'testLabel_1', key: 'testKey_1'},
      {label:'testLabel_2', key: 'testKey_2'},
      {label:'testLabel_3', key: 'testKey_3'}
    ];
    const testChange = jest.fn();

    render(<SelectizeBox onEntityChange={testChange}
    onRSetChange={_=>{}}
    entitySelected={null}
    entityOptions={testArray}
    rSetSelected={null}
    rSetOptions={[]} />);

    userEvent.hover(screen.getByLabelText('Entity:'));
    userEvent.click(screen.getByLabelText('Entity:'));
    await waitFor(()=>screen.getByText('testLabel_1'));

    userEvent.hover(screen.getByText('testLabel_1'));
    userEvent.click(screen.getByText('testLabel_1'));

    expect(testChange).toBeCalled();
  });

  test('clicking an relationship set dropdown option invokes state change', async () => {
    const testArray = [
      {label:'testLabel_1', key: 'testKey_1'},
      {label:'testLabel_2', key: 'testKey_2'},
      {label:'testLabel_3', key: 'testKey_3'}
    ];
    const testChange = jest.fn();

    render(<SelectizeBox onEntityChange={_=>{}}
    onRSetChange={testChange}
    entitySelected={null}
    entityOptions={[]}
    rSetSelected={null}
    rSetOptions={testArray} />);

    userEvent.hover(screen.getByLabelText('Relationship Set:'));
    userEvent.click(screen.getByLabelText('Relationship Set:'));
    await waitFor(()=>screen.getByText('testLabel_1'));

    userEvent.hover(screen.getByText('testLabel_1'));
    userEvent.click(screen.getByText('testLabel_1'));

    expect(testChange).toBeCalled();
  });

  test('render the label of a selected entity', () => {
    const testArray = [
      {label:'testLabel_1', key: 'testKey_1'},
      {label:'testLabel_2', key: 'testKey_2'},
      {label:'testLabel_3', key: 'testKey_3'}
    ];
    const testLabel = testArray[0];

    render(<SelectizeBox onEntityChange={_=>{}}
    onRSetChange={_=>{}}
    entitySelected={testLabel}
    entityOptions={testArray}
    rSetSelected={null}
    rSetOptions={[]} />);

    expect(()=>screen.getByText('testLabel_1')).not.toThrow();
    expect(()=>screen.getByText('testLabel_2')).toThrow();
    expect(()=>screen.getByText('testLabel_3')).toThrow();
  });

  test('render the label of a selected relationship set', () => {
    const testArray = [
      {label:'testLabel_1', key: 'testKey_1'},
      {label:'testLabel_2', key: 'testKey_2'},
      {label:'testLabel_3', key: 'testKey_3'}
    ];
    const testLabel = testArray[0];

    render(<SelectizeBox onEntityChange={_=>{}}
    onRSetChange={_=>{}}
    entitySelected={null}
    entityOptions={[]}
    rSetSelected={testLabel}
    rSetOptions={testArray} />);

    expect(()=>screen.getByText('testLabel_1')).not.toThrow();
    expect(()=>screen.getByText('testLabel_2')).toThrow();
    expect(()=>screen.getByText('testLabel_3')).toThrow();
  });