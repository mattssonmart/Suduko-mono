import { StyleSheet, Dimensions } from 'react-native';
import { theme } from './theme';

const { width } = Dimensions.get('window');
const GRID_SIZE = width - 20;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },

  header: {
    width: GRID_SIZE,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: theme.colors.textMain,
  },
  timerContainer: {
    backgroundColor: theme.colors.card,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  timerText: {
    color: theme.colors.accent,
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'monospace',
  },

  grid: {
    width: GRID_SIZE,
    height: GRID_SIZE,
    borderWidth: 3,
    borderColor: theme.colors.thickBorder,
    backgroundColor: theme.colors.thickBorder,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
  },
  cell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: theme.colors.border,
  },
  blockEven: { backgroundColor: theme.colors.cellBg },
  blockOdd: { backgroundColor: theme.colors.cellBg },
  cellOriginal: {
    backgroundColor: theme.colors.cellBgAlt,
  },
  thickRight: {
    borderRightWidth: 3,
    borderRightColor: theme.colors.thickBorder,
  },
  thickBottom: {
    borderBottomWidth: 3,
    borderBottomColor: theme.colors.thickBorder,
  },
  selectedCell: {
    backgroundColor: 'rgba(56, 189, 248, 0.3)',
    borderColor: theme.colors.accent,
    borderWidth: 2,
  },

  cellText: {
    fontSize: 22,
    fontWeight: '700',
  },
  cellTextOriginal: {
    color: theme.colors.textMain,
    fontWeight: '800',
  },
  cellTextPlayer: {
    color: theme.colors.accent,
    fontWeight: '500',
  },
  selectedText: {
    color: theme.colors.accent,
  },

  numpad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 30,
    gap: 10,
    width: GRID_SIZE,
  },
  numButton: {
    width: (GRID_SIZE / 5) - 12,
    height: 50,
    backgroundColor: theme.colors.card,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  numButtonPressed: {
    backgroundColor: theme.colors.accent,
    borderColor: theme.colors.accent,
  },
  numButtonText: {
    color: theme.colors.accent,
    fontSize: 24,
    fontWeight: 'bold',
  },

  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: theme.colors.card,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingBottom: 10,
  },
  navItem: {
    alignItems: 'center',
    flex: 1,
  },
  navText: {
    color: '#FFFFFF',
    fontSize: 12,
    marginTop: 4,
    fontWeight: '600',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#1A1A1A',
    borderRadius: 25,
    padding: 25,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 25,
    letterSpacing: 1,
  },
  menuButton: {
    width: '100%',
    paddingVertical: 18,
    backgroundColor: '#2A2A2A',
    borderRadius: 15,
    marginVertical: 6,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#444',
  },
  menuButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 18,
    textTransform: 'uppercase',
  },
  cancelButtonText: {
    color: '#FF4B4B',
    marginTop: 15,
    fontSize: 16,
    fontWeight: '600',
  },

  newGameButton: {
    marginTop: 30,
    backgroundColor: theme.colors.accent,
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 12,
    shadowColor: theme.colors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  newGameButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 1,
  },
});

export { GRID_SIZE };
