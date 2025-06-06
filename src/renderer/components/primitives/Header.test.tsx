import { MarkGithubIcon } from '@primer/octicons-react';
import { fireEvent, render, screen } from '@testing-library/react';
import { AppContext } from '../../context/App';
import { Header } from './Header';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('renderer/components/primitives/Header.tsx', () => {
  const fetchNotifications = jest.fn();

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render itself & its children', () => {
    const tree = render(<Header icon={MarkGithubIcon}>Test Header</Header>);

    expect(tree).toMatchSnapshot();
  });

  it('should navigate back', () => {
    render(<Header icon={MarkGithubIcon}>Test Header</Header>);

    fireEvent.click(screen.getByTestId('header-nav-back'));

    expect(mockNavigate).toHaveBeenNthCalledWith(1, -1);
  });

  it('should navigate back and fetch notifications', () => {
    render(
      <AppContext.Provider
        value={{
          fetchNotifications,
        }}
      >
        <Header fetchOnBack icon={MarkGithubIcon}>
          Test Header
        </Header>
      </AppContext.Provider>,
    );

    fireEvent.click(screen.getByTestId('header-nav-back'));

    expect(mockNavigate).toHaveBeenNthCalledWith(1, -1);
    expect(fetchNotifications).toHaveBeenCalledTimes(1);
  });
});
