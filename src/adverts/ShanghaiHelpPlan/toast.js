import MessageTip from '@components/messageTip';

export const getToast = (message) => {
    return <MessageTip time={2500} backgroundColor='#333' message={message} />
}
