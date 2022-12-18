import { Content } from "./content"
import { Notification } from "./notifications";

describe('Notification ', () => {
  it('should be able to create a notification', () => {
    const notification = new Notification({
      content: new Content('Nova solicitaçãod e amizade'),
      category: 'social',
      recipientId: 'example-recipeint-id',
    })
  
    expect(notification).toBeTruthy();
  })
  
})

