import config from '../../config.cjs';

const autorecordingCommand = async (m, Matrix) => {
  const prefixMatch = m.body.match(/^[\\/!#.]/);
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim().toLowerCase();

  if (cmd === 'autorecording') {
    let responseMessage;

    if (text === 'on') {
      config.AUTO_RECORDING = true;
      responseMessage = "Auto-Recording has been enabled.";
    } else if (text === 'off') {
      config.AUTO_RECORDING = false;
      responseMessage = "Auto-Recording has been disabled.";
    } else {
      responseMessage = "Usage:\n- `autorecording on`: Enable Auto-Recording\n- `autorecording off`: Disable Auto-Recording";
    }

    try {
      await Matrix.sendMessage(m.from, { text: responseMessage }, { quoted: m });
    } catch (error) {
      console.error("Error processing your request:", error);
      await Matrix.sendMessage(m.from, { text: 'Error processing your request.' }, { quoted: m });
    }
  }
};

export default autorecordingCommand;