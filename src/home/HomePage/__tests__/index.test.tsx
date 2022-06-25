import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import HomePage, { CREATE_YOUR_FIRST_CLASS_LABEL } from "../index";
import { NEW_DECK_LABEL } from "../../AddNewDeckButton";

jest.mock("next-auth/react", () => {
  const originalModule = jest.requireActual("next-auth/react");
  const mockSession = {
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user: { username: "admin" },
  };
  return {
    __esModule: true,
    ...originalModule,
    useSession: jest.fn(() => {
      return { data: mockSession, status: "authenticated" }; // return type is [] in v3 but changed to {} in v4
    }),
  };
});

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

const classesMock = [
  {
    name: "Backend",
    decks: [
      {
        id: "cl2jmr7wo0033w8vgjelq00u2",
        classId: "cl2jmqeqv0012w8vggul9u8ow",
        name: "General info",
        creationDate: "2022-04-28T23:21:29.544Z",
      },
    ],
    id: "cl2jmqeqv0012w8vggul9u8ow",
  },
  {
    name: "Frontend",
    decks: [
      {
        id: "cl34zv5po0130sqwqhcya6vck",
        classId: "cl2jmqncb0023w8vg1lv72739",
        name: "Interview Questions",
        creationDate: "2022-05-13T22:11:38.028Z",
      },
      {
        id: "cl34zvd0p0140sqwqhbpzdykl",
        classId: "cl2jmqncb0023w8vg1lv72739",
        name: "UI UX",
        creationDate: "2022-05-13T22:11:47.497Z",
      },
    ],
    id: "cl2jmqncb0023w8vg1lv72739",
  },
];
const changeSelectedClass = jest.fn();
const updateSelectedClassAfterDelete = jest.fn();
const setIsCreateClassModalVisible = jest.fn();

describe("Home Page component", () => {
  it("renders a list of contacts", () => {
    const queryClient = new QueryClient();

    const selectedClass = classesMock[0];

    render(
      <QueryClientProvider client={queryClient}>
        <HomePage
          classes={classesMock}
          selectedClass={selectedClass}
          changeSelectedClass={changeSelectedClass}
          updateSelectedClassAfterDelete={updateSelectedClassAfterDelete}
          isCreateClassModalVisible={false}
          setIsCreateClassModalVisible={setIsCreateClassModalVisible}
        />
      </QueryClientProvider>
    );
    expect(screen.getByText(`${selectedClass.name} decks`)).toBeVisible();
    expect(screen.getByText(NEW_DECK_LABEL)).toBeVisible();
    expect(
      screen.queryByText(CREATE_YOUR_FIRST_CLASS_LABEL)
    ).not.toBeInTheDocument();
  });

  it("shows create your first class text if there is no classes", () => {
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <HomePage
          classes={[]}
          changeSelectedClass={changeSelectedClass}
          updateSelectedClassAfterDelete={updateSelectedClassAfterDelete}
          isCreateClassModalVisible={false}
          setIsCreateClassModalVisible={setIsCreateClassModalVisible}
        />
      </QueryClientProvider>
    );

    expect(screen.getByText(CREATE_YOUR_FIRST_CLASS_LABEL)).toBeVisible();
    expect(screen.queryByText(NEW_DECK_LABEL)).not.toBeInTheDocument();
  });
});
