package com.pc.store.server.services;

import com.pc.store.server.dao.CartRepository;
import com.pc.store.server.dao.CustomerRepository;
import com.pc.store.server.dao.OrderRepository;
import com.pc.store.server.dto.request.OrderCreationRequest;
import com.pc.store.server.entities.*;
import com.pc.store.server.exception.AppException;
import com.pc.store.server.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import java.text.DecimalFormat;
import java.util.List;

@Service
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@Slf4j
public class OrderService {
    CustomerRepository customerRepository;
    OrderRepository orderRepository;
    EmailService emailService;
    CartRepository cartRepository;

    public boolean saveOrder(OrderCreationRequest request){
        Customer customer = customerRepository.findById(new ObjectId(request.getCustomerId()))
                .orElseThrow(()-> new AppException(ErrorCode.CUSTOMER_NOT_FOUND));
        Order order = Order.builder()
                .customer(customer)
                .shipAddress(request.getShipAddress())
                .items(request.getItems())
                .totalPrice(request.getTotalPrice())
                .orderStatus(OrderStatus.valueOf(request.getOrderStatus()))
                .build();
        orderRepository.save(order);
        try {
            String emailBody = generateOrderEmailContent(order);
            emailService.sendOrderConfirmation(customer.getEmail(), "Order Confirmation", emailBody);
        }catch (Exception e){
           e.printStackTrace();
        }
        // Tìm Cart dựa trên customerId
        Cart cart = cartRepository.findByCustomerId(new ObjectId(request.getCustomerId()))
                .orElseThrow(() -> new AppException(ErrorCode.CART_NOT_FOUND));
        cart.getItems().clear();
        cartRepository.save(cart);
        return true;
    }
    public List<Order> getAllOrders(ObjectId customerId){
        return orderRepository.findAllByCustomerId(customerId);
    }
    public Order updateOrderStatus(ObjectId orderId, String status){
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));
        order.setOrderStatus(OrderStatus.valueOf(status));
        return orderRepository.save(order);
    }
    public String generateOrderEmailContent(Order order) {
        StringBuilder htmlContent = new StringBuilder();

        htmlContent.append("<!DOCTYPE html>");
        htmlContent.append("<html lang=\"vi\">");
        htmlContent.append("<head>");
        htmlContent.append("<meta charset=\"UTF-8\" />");
        htmlContent.append("<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />");
        htmlContent.append("<title>Xác nhận đơn hàng</title>");
        htmlContent.append("<style>");
        htmlContent.append("* {\n" +
                "        margin: 0;\n" +
                "        padding: 0;\n" +
                "        box-sizing: border-box;\n" +
                "      }\n" +
                "\n" +
                "      body {\n" +
                "        font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto,\n" +
                "          Helvetica, Arial, sans-serif;\n" +
                "        line-height: 1.6;\n" +
                "        color: #333;\n" +
                "        background: #f5f5f5;\n" +
                "        padding: 20px;\n" +
                "      }\n" +
                "\n" +
                "      .container {\n" +
                "        max-width: 800px;\n" +
                "        margin: 0 auto;\n" +
                "        background: #fff;\n" +
                "        border-radius: 12px;\n" +
                "        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);\n" +
                "        overflow: hidden;\n" +
                "      }\n" +
                "\n" +
                "      .header {\n" +
                "        background: linear-gradient(135deg, #4a90e2 0%, #357abd 100%);\n" +
                "        color: white;\n" +
                "        padding: 30px;\n" +
                "        text-align: center;\n" +
                "      }\n" +
                "\n" +
                "      .header h1 {\n" +
                "        font-size: 24px;\n" +
                "        margin-bottom: 10px;\n" +
                "      }\n" +
                "\n" +
                "      .content {\n" +
                "        padding: 30px;\n" +
                "      }\n" +
                "\n" +
                "      .section {\n" +
                "        margin-bottom: 30px;\n" +
                "      }\n" +
                "\n" +
                "      .section-title {\n" +
                "        font-size: 18px;\n" +
                "        color: #2c3e50;\n" +
                "        margin-bottom: 20px;\n" +
                "        padding-bottom: 10px;\n" +
                "        border-bottom: 2px solid #eee;\n" +
                "      }\n" +
                "\n" +
                "      .order-table {\n" +
                "        width: 100%;\n" +
                "        border-collapse: collapse;\n" +
                "        margin-bottom: 30px;\n" +
                "      }\n" +
                "\n" +
                "      .order-table th {\n" +
                "        background: #f8f9fa;\n" +
                "        padding: 12px 15px;\n" +
                "        text-align: left;\n" +
                "        font-weight: 600;\n" +
                "        color: #555;\n" +
                "        border-bottom: 2px solid #eee;\n" +
                "      }\n" +
                "\n" +
                "      .order-table td {\n" +
                "        padding: 12px 15px;\n" +
                "        border-bottom: 1px solid #eee;\n" +
                "      }\n" +
                "\n" +
                "      .order-table .text-right {\n" +
                "        text-align: right;\n" +
                "      }\n" +
                "\n" +
                "      .order-table .text-center {\n" +
                "        text-align: center;\n" +
                "      }\n" +
                "\n" +
                "      .total-row {\n" +
                "        background: #f8f9fa;\n" +
                "        font-weight: bold;\n" +
                "      }\n" +
                "\n" +
                "      .shipping-info {\n" +
                "        background: #f8f9fa;\n" +
                "        padding: 20px;\n" +
                "        border-radius: 8px;\n" +
                "        margin-bottom: 30px;\n" +
                "      }\n" +
                "\n" +
                "      .shipping-grid {\n" +
                "        display: grid;\n" +
                "        grid-template-columns: repeat(2, 1fr);\n" +
                "        gap: 20px;\n" +
                "      }\n" +
                "\n" +
                "      .info-item {\n" +
                "        margin-bottom: 15px;\n" +
                "      }\n" +
                "\n" +
                "      .info-label {\n" +
                "        color: #666;\n" +
                "        margin-bottom: 5px;\n" +
                "        font-size: 14px;\n" +
                "      }\n" +
                "\n" +
                "      .info-value {\n" +
                "        font-weight: 500;\n" +
                "        color: #333;\n" +
                "      }\n" +
                "\n" +
                "      .alert {\n" +
                "        background: #e8f4fd;\n" +
                "        border-left: 4px solid #4a90e2;\n" +
                "        padding: 15px;\n" +
                "        margin-bottom: 30px;\n" +
                "        color: #2c5282;\n" +
                "      }\n" +
                "\n" +
                "      .footer {\n" +
                "        text-align: center;\n" +
                "        padding: 20px;\n" +
                "        background: #f8f9fa;\n" +
                "        color: #666;\n" +
                "        font-size: 14px;\n" +
                "      }\n" +
                "\n" +
                "      @media (max-width: 600px) {\n" +
                "        .shipping-grid {\n" +
                "          grid-template-columns: 1fr;\n" +
                "        }\n" +
                "\n" +
                "        .order-table {\n" +
                "          font-size: 14px;\n" +
                "        }\n" +
                "\n" +
                "        .content {\n" +
                "          padding: 20px;}}");
        htmlContent.append("</style>");
        htmlContent.append("</head>");
        htmlContent.append("<body>");
        htmlContent.append("<div class=\"container\">");
        htmlContent.append("<div class=\"header\">");
        htmlContent.append("<h1>Xác nhận đơn hàng</h1>");
        htmlContent.append("</div>");
        htmlContent.append("<div class=\"content\">");

        // Order Details Section
        htmlContent.append("<div class=\"section\">");
        htmlContent.append("<h2 class=\"section-title\">Chi tiết đơn hàng</h2>");
        htmlContent.append("<table class=\"order-table\">");
        htmlContent.append("<thead>");
        htmlContent.append("<tr>");
        htmlContent.append("<th>Sản phẩm</th>");
        htmlContent.append("<th>Số lượng</th>");
        htmlContent.append("<th>Giá</th>");
        htmlContent.append("</tr>");
        htmlContent.append("</thead>");
        htmlContent.append("<tbody>");
        DecimalFormat df = new DecimalFormat("#,###.00");
        for (CartItem item : order.getItems()) {
            htmlContent.append("<tr>");
            htmlContent.append("<td>").append(item.getProduct().getName()).append("</td>");
            htmlContent.append("<td class=\"text-center\">").append(item.getQuantity()).append("</td>");
            htmlContent.append("<td class=\"text-right\">").append(String.format("%s", df.format(item.getProduct().getPriceAfterDiscount()))).append(" VND</td>");
            htmlContent.append("</tr>");
        }

        htmlContent.append("<tr class=\"total-row\">");
        htmlContent.append("<td colspan=\"2\">Tổng cộng</td>");
        htmlContent.append("<td class=\"text-right\">").append(String.format("%s", df.format(order.getTotalPrice()))).append(" VND</td>");
        htmlContent.append("</tr>");
        htmlContent.append("</tbody>");
        htmlContent.append("</table>");
        htmlContent.append("</div>");

        // Shipping Information Section
        htmlContent.append("<div class=\"section\">");
        htmlContent.append("<h2 class=\"section-title\">Thông tin giao hàng</h2>");
        htmlContent.append("<div class=\"shipping-info\">");
        htmlContent.append("<div class=\"info-item\">");
        htmlContent.append("<div class=\"info-label\">Địa chỉ giao hàng</div>");
        htmlContent.append("<div class=\"info-value\">").append(order.getShipAddress()).append("</div>");
        htmlContent.append("</div>");
        htmlContent.append("</div>");
        htmlContent.append("</div>");

        htmlContent.append("<div class=\"alert\">");
        htmlContent.append("Cảm ơn bạn đã mua sắm tại cửa hàng chúng tôi. Chúng tôi sẽ giao hàng trong thời gian sớm nhất.");
        htmlContent.append("</div>");
        htmlContent.append("</div>");
        htmlContent.append("<div class=\"footer\">");
        htmlContent.append("Cửa hàng của bạn - Liên hệ: 0123456789");
        htmlContent.append("</div>");
        htmlContent.append("</div>");
        htmlContent.append("</body>");
        htmlContent.append("</html>");

        return htmlContent.toString();
    }

}
